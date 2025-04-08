<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\DataAccount;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(){

        $user = Auth::user();

        if($user){
            $dataAccount = DataAccount::where('id_user', $user->id)
            ->with('accountType')
            ->first();
        }

    }
}
