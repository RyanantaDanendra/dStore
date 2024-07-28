<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sneaker;
use App\Models\User;

class dashboardController extends Controller
{
    public function index() {
        $sneakers = Sneaker::all();
        $totalUsers = User::count();

        return Inertia::render('Dashboard', [
            'sneakers' => $sneakers,
            'totalUsers' => $totalUsers,
        ]);
    }

    public function sneakers() {
        return Inertia::render('Dashboard/Sneakers');
    }
}

