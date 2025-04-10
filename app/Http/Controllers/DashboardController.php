<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\DataAccount;
use App\Models\InfoTypeFiles;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index($path = null)
    {
        $user = Auth::user();

        $routeFolder = $path ? explode('/', $path) : [];

        $dataAccount = DataAccount::where('id_user', $user->id)
            ->with('accountType')
            ->first();

        $typesExtensions = InfoTypeFiles::where('id_type_level', '<=', $dataAccount['accountType']['max_level_files'])
            ->pluck('extension')
            ->toArray();

        return Inertia::render('Dashboard', [
            'user' => $user,
            'dataAccount' => $dataAccount,
            'typeFiles' => $typesExtensions,
            'routeFolder' => $routeFolder
        ]);
    }
}
