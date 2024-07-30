<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sneaker;
use App\Models\User;
use App\Models\Size;

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

    // DASHBOARD -> SNEAKERS

    public function sneakers() {
        $sneakers = Sneaker::all();
        $sneakerId = Sneaker::pluck('id');

        $sizes = Size::whereIn('id_sneaker', $sneakerId)->get();

        return Inertia::render('Dashboard/Sneakers', [
            'sneakers' => $sneakers,
            'sizes' => $sizes,
        ]);
    }

    public function addSneakerPage() {
        return Inertia::render('Dashboard/AddSneaker');
    }

    public function addSneaker(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required | string | max : 50',
            'brand' => 'required | string | max : 20',
            'condition' => 'required | string | max : 20',
        ]);

        Sneaker::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'condition' => $request->condition,
        ]);

        return redirect()->route('addSneakerPage')->with('success', 'Sneaker Added Successfully');
    }
}

