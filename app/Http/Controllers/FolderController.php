<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\DataAccount;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FolderController extends Controller
{
    public function getfoldersUser(Request $request)
    {
        $user = Auth::user();

        $dataAccount = DataAccount::where('id_user', $user->id)
            ->with('accountType')
            ->first();

        if (!$dataAccount) {
            return response()->json(['message' => 'Account not found'], 404);
        }

        $url = $request->query('url');

        $foldersUserInUrl = Folder::where('id_account', $dataAccount->id)
        ->where('location',$url)
        ->get();

        return $foldersUserInUrl;

    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $dataAccount = DataAccount::where('id_user', $user->id)
            ->with('accountType')
            ->first();

        if (!$dataAccount) {
            return response()->json(['message' => 'Account not found'], 404);
        }


        $validatedData = $request->validate([
            'name' => ['required', 'max:200'],
            'location' => ['nullable'],
            'color' => ['nullable']
        ]);

        Folder::create([
            'id_account' => $dataAccount->id,
            'location' => $validatedData['location'] ?? null,
            'name' => $validatedData['name'],
            'num_order' => $request->num_order ?? null,
            'color' => $request->color ?? null,
            'favorite' => 0,
            'type_share' => 'none',
            'id_user_add' => $user->id 
        ]);

        $path = '/archives/' . $dataAccount->id . '/home/' . $validatedData['name'];

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

        return redirect()->back()->with('message', 'Folder created')->with('typeAlert', 'success');
    }

    public function togglefavoritefolder(Request $request) {

        // $dataAccount = DataAccount::where('id_user', $user->id)
        //     ->with('accountType')
        //     ->first();

        // if (!$dataAccount) {
        //     return response()->json(['message' => 'Account not found'], 404);
        // }

        $id = $request->query('id');
        $favorite = $request->query('favorite');

        $folder = Folder::where('id', $id)->first();

        if (!$folder) {
            return response()->json(['message' => 'Folder not found'], 404);
        }

        $folder->favorite = $favorite;
        $folder->save();

        //return redirect()->back()->with('message', 'Favorite status updated successfully')->with('typeAlert', 'success');
        return json_encode($favorite);
    }

    public function getInfoFolder(Request $request) {
        $id = $request->query('id');
        $folder = Folder::where('id', $id)->first();
        return json_encode($folder);
    }

    public function deleteFolder(Request $request) {
        try {
            $id = $request->input('id');
            $accountId = $request->input('accountId');

            $folder = Folder::where('id', $id)
                ->where('id_account', $accountId)
                ->first();

            if (!$folder) {
                return response()->json(['error' => 'Folder not found'], 404);
            }

            $folder->delete();

            return response()->json(['message' => 'success', 'folder' => $folder]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function editfolder(Request $request){
        //UPDATE FOLDER
        $id = $request->input('id');
        return response()->json(['id' => $id]);
    }

}
