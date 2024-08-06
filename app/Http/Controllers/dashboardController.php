<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sneaker;
use App\Models\User;
use App\Models\Size;
use App\Models\Image;

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

        return redirect()->route('dashboard.sneakers')->with('success', 'Sneaker Added Successfully');
    }

    // DASHBOARD -> SNEAKERS -> ADD SIZE
    public function addSizePage($id) {
        return Inertia::render('Dashboard/AddSize', [
            'id' => $id,
        ]);
    }

    public function addSize($id, Request $request) {
        $validatedData = $request->validate([
            'size' => 'required | integer | max: 99',
            'stock' => 'required | integer | max: 99',
        ]);

        Size::create([
            'id_sneaker' => $id,
            'size' => $request->size,
            'stock' => $request->stock,
        ]);

        return redirect()->route('dashboard.sneakers');
    }

    // DASHBOARD -> SNEAKERS -> ADD IMAGE
    public function addImagesPage($id) {
        return Inertia::render('Dashboard/AddImages', [
            'id' => $id,
        ]);
    }

    public function addImages($id, Request $request) {
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png',
        ]);

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('image', 'public');
        } else {
            return redirect()->back()->withErrors(['image' => 'Image file is required.']);
        }

        Image::create([
            'id_sneaker' => $id,
            'image' => $path,
        ]);

        return redirect()->route('dashboard.sneakers');
    }

    // DASHBOARD -> SNEAKERS -> EDIT SNEAKER
    public function editSneakerPage($id) {
        $sneaker = Sneaker::find($id);

        return Inertia::render('Dashboard/EditSneaker', [
            'id' => $id,
            'sneaker' => $sneaker,
        ]);
    }

    public function editSneaker($id, Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'brand' => 'required|string|max:20',
            'condition' => 'required|string|max:20',
        ]);

        $sneaker = Sneaker::find($id);

        $sneaker->update($validatedData);

        return redirect()->route('dashboard.sneakers')->with('success', 'Sneaker data updated successfully!');
    }

    // DASHBOARD -> SNEAKERS -> EDIT SIZE AND STOCK
    public function editSizeStockPage($id) {
        $size = Size::find($id);

        return Inertia::render('Dashboard/EditSizeStock', [
            'id' => $id,
            'size' => $size, 
        ]);
    }
}

