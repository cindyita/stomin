<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\DataAccount;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $dataAccount = DataAccount::where('id_user', $user->id)
            ->with('accountType')
            ->first();

        return Inertia::render('Dashboard', [
            'user' => $user,
            'dataAccount' => $dataAccount,
        ]);
    }
}
