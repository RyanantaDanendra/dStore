<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sneaker;
use App\Models\User;
use App\Models\Size;
use App\Models\Image;
use App\Models\Apparel;
use Illuminate\Support\Facades\Storage;

class dashboardController extends Controller
{
    public function index() {
        $sneakers = Sneaker::all();
        $totalUsers = User::count();
        $totalApparels = Apparel::count();

        return Inertia::render('Dashboard', [
            'sneakers' => $sneakers,
            'totalUsers' => $totalUsers,
            'totalApparels' => $totalApparels,
        ]);
    }

    // DASHBOARD -> SNEAKERS
    public function sneakers() {
        $sneakers = Sneaker::all();
        $sneakerId = Sneaker::pluck('id');

        $sizes = Size::whereIn('id_sneaker', $sneakerId)->get();
        $images = Image::whereIn('id_sneaker', $sneakerId)->get();

        return Inertia::render('Dashboard/Sneakers', [
            'sneakers' => $sneakers,
            'sizes' => $sizes,
            'images' => $images,
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

    public function editSizeStock($id, Request $request) {
        $validatedData = $request->validate([
            'size' => 'required | integer | max: 99',
            'stock' => 'required | integer | max: 99',
        ]);

        $size = Size::find($id);

        $size->update($validatedData);

        return redirect()->route('dashboard.sneakers')->with('success', 'Sneaker data updated successfully!');
    }

    // DASHBOARD -> SNEAKERS -> DELETE
    public function deleteSneaker($id) {
        $sneaker = Sneaker::find($id);

        if($sneaker) {
            // FIND IMAGE PATH AND DELETE IMAGE IN STORAGE
            $imagePath = $sneaker->image_path;
            $path = 'public/image' . $imagePath;
    
            if(Storage::exists($path)) {
                Storage::delete($path);
            }
    
            // DELETE SNEAKER SIZE
            $sizes = Size::whereIn('id_sneaker', $sneaker)->delete();

            // DELETE SNEAKER DATA ( NAME, BRAND, CONDITION )
            $sneaker->delete();
        }
    }

    public function deleteSizeStock($id) {
        // FIND SNEAKER ID
        $sneaker = Sneaker::find($id);

        // CHECK IF THERE'S A SIZE AND STOCK DATA BASED ON THE SNEAKER ID
        if(Size::whereIn('id_sneaker', $sneaker)) {
            $sizes = Size::whereIn('id_sneaker', $sneaker)->delete();
        }
    }

    public function deleteImage($id) {
        $image = Image::find($id);

        // if (!$sneaker) {
        //     return response()->json(['message' => 'Sneaker not found'], 404);
        // }
        
        // if (!$sneaker->image) {
        //     return response()->json(['message' => 'Image not found'], 404);
        // }
        
        // Proceed with deletion
        $path = $image->image;
        // dd($path);
        
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        } else {
            return response()->json(['message' => 'File does not exist'], 404);
        }
        
        $image->delete();
    }

    // DASHBOARD -> USERS
    public function usersPage() {
        $users = User::all();

        return Inertia::render('Dashboard/Users', [
            'users' => $users,
        ]);
    }

    // DASHBOARD -> USERS -> CHANGE sTATUS
    public function changeStatus($id) {
        $user = User::find($id);

        $change = $user->status === 'active' ? 'unactive' : 'active';

        $user->update([
            'status' => $change,
        ]);
    
    }

    // DASHBOARD -> APPARELS
    public function apparelsPage() {
        // FETCH ALL APPARELS DATA
        $apparels = Apparel::all();
        // FETCH APPAREL ID
        $apparelid = Apparel::pluck('id');

        // FETCH APPAREL SIZE BASED ON THE APPAREL ID
        $sizes = Size::whereIn('id_apparel', $apparelid)->get();
        // FETCH APPAREL IMAGES BASED ON THE APPAREL ID
        $images = Image::whereIn('id_apparel', $apparelid)->get();

        return Inertia::render('Dashboard/Apparels', [
            'apparels' => $apparels,
            'sizes' => $sizes, 
            'images' => $images
        ]);
    }

    // DASHBOARD -> APPARELS -> ADD APPAREL
    public function addApparelPage() {
        return Inertia::render('Dashboard/AddApparel');
    }

    public function addApparel(Request $request) {
        $valodateddata = $request->validate([
            'name' => 'required|string|max:50',
            'brand' => 'required|string|max:30',
            'condition' => 'required|string|max:20',
        ]);

        Apparel::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'condition' => $request->condition,
        ]);

        return redirect()->route('apparelsPage')->with('success', 'Apparel Added successfully');
    }

    public function addApparelSizePage($id) {
        return Inertia::render('Dashboard/AddApparelSize', [
            'id' => $id,
        ]);
    }

    public function addApparelSize($id, Request $request) {
        $validatedData = $request->validate([
            'size' => 'required|integer|max:70',
            'stock' => 'required|integer|max:100',
        ]);

        Size::create([
            'id_apparel' => $id,
            'size' => $request->size,
            'stock' => $request->stock,
        ]);

        return redirect()->route('apparelsPage')->with('success', 'Size and stock added successfully!');
    }

    // ADD APPAREL IMAGES
    public function addApparelImagespage($id) {
        return Inertia::render('Dashboard/AddApparelImages', [
            'id' => $id,
        ]);
    }

    public function addApparelImages($id, Request $request) {
        $validatedData = $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png',
        ]);

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('image', 'public');
        } else {
            return redirect()->back()->withErrors(['image' => 'Image file is required.']);
        }

        Image::create([
            'id_apparel' => $id,
            'image' => $path,
        ]);

        return redirect()->route('apparelsPage');
    }

    public function editApparelPage($id) {
        $apparel = Apparel::find($id);

        return Inertia::render('Dashboard/EditApparel', [
            'id' => $id,
            'apparel' => $apparel,
        ]);
    }

    public function editApparel($id, Request $request) {
        // APPAREL DATA REQUIREMET
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'brand' => 'required|string|max:30',
            'condition' => 'required|string|max:20',
        ]);

        // FIND APPAREL DATA BASED ON THE ID
        $apparel = Apparel::find($id);

        // UPDATE APPAREK DATA
        $apparel->update($validatedData);

        // RETURN REDIRECT TO APPARELS TABLE PAGE
        return redirect()->route('apparelsPage');
    }

    public function editApparelSizeAndStockPage($id) {
        return Inertia::render('Dashboard/EditApparelSizeStock', [
            'id' => $id,
        ]);
    }
}

