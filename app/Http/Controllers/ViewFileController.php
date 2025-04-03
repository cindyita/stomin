<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;

class ViewFileController extends Controller
{
    public function index()
    {

        // $file = DataAccount::where('id_user', $user->id)
        //     ->with('accountType')
        //     ->first();

        return Inertia::render('ViewFile', []);
    }
}
