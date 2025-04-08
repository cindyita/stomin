<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\DataAccount;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FolderController extends Controller
{
    public function getfoldersUser(Request $request)
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

        $url = $request->query('url');

        $foldersUserInUrl = Folder::where('id_account', $dataAccount->id)
        ->where('location',$url)
        ->get();

        return json_encode($foldersUserInUrl);

    }

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

        return redirect()->back()->with('message', 'Folder created')->with('typeAlert', 'success');
    }
}
