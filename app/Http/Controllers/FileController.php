<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use App\Models\Files;
use App\Models\DataAccount;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $dataAccount = DataAccount::where('id_user', $user->id)
            ->with('accountType')
            ->first();

        if (!$dataAccount) {
            return response()->json(['message' => 'Account not found'], 404);
        }

        $validatedData = $request->validate([
            'location' => ['nullable'],
            'color' => ['nullable'],
            'files' => ['required', 'array'],
            'files.*' => ['file'],
        ]);

        $files = $request->file('files');
        $accountFolderPath = './public/storage/archives/' . $dataAccount->id;

        if (!Storage::exists($accountFolderPath)) {
            Storage::makeDirectory($accountFolderPath);
        }

        if(!$files){
            return "files not found";
        }

        foreach ($files as $file) {

            $fileName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $typeMime = $file->getMimeType();
            $size = $file->size();

            $uniqueFileName = uniqid() . '.' . $extension;

            $file->storeAs($accountFolderPath, $uniqueFileName);

            Files::create([
                'id_account' => $dataAccount->id,
                'location' => $validatedData['location'] ?? null,
                'name' => $fileName,
                'extension' => $extension,
                'type_mime' => $typeMime,
                'num_order' => 0,
                'id_type_file'=>null,
                'size'=> $size,
                'color' => $request->color ?? null,
                'favorite' => 0,
                'type_share' => 'none',
                'id_user_add' => $user->id
            ]);
        }

        return redirect()->back()->with('message', 'Files uploaded successfully')->with('typeAlert', 'success');
    }
}
