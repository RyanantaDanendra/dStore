<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Apparel;
use App\Models\Image;
use App\Models\SIze;
use App\Models\Order;
use App\Models\Like;

class apparelsController extends Controller
{
    public function index() {
        $apparels = Apparel::all();
        $apparelId = $apparels->pluck('id');

        $images = Image::whereIn('id_apparel', $apparelId)->get();
        $sizes = Size::whereIn('id_apparel', $apparelId)->get();

        return Inertia::render('Apparels', [
            'apparels' => $apparels,
            'images' => $images,
            'sizes' => $sizes,
        ]);
    }

    public function apparelDetailsPage($id) {
        // FRTCH APPAREL BASED ON THE ID FROM THE URL
        $apparel = Apparel::find($id);
        // TAKE THE ID FROM THE APPAREL TABLE
        $apparelId = $apparel->pluck('id');

        // FETCH THE APPAREL IMAGE
        $images = Image::whereIn('id_apparel', $apparelId)->get();
        // FETCH THE APPAREL SIZE
        $sizes = Size::whereIn('id_apparel', $apparelId)->get();

        // CHECK IF THERE IS A LIKE DATA OF USER AND APPAREL
        $liked = Like::where('id_user', auth()->user()->id)->where('id_apparel', $id)->exists();

        return Inertia::render('ApparelDetails', [
            'id' => $id,
            'apparel' => $apparel,
            'images' => $images,
            'sizes' => $sizes,
            'liked' => $liked,
        ]);
    }

    public function orderApparel($id, Request $request) {
        Order::create([
            'id_user' => auth()->user()->id,
            'id_apparel' => $id,
            'id_size' => $request->id_size,
            'quantity' => $request->quantity,
        ]);

        $size = Size::where('id_apparel', $id)->where('id', $request->id_size)->first();

        if($size) {
            $size->stock -= $request->quantity;

            $size->save();
        } else {
            return back()->withErrors(['size' => 'Size not found for this sneaker']);
        }
    }

    public function like($id) {
        $liked = Like::where('id_user', auth()->user()->id)->where('id_apparel', $id)->first();

        if($liked) {
            $liked->delete();
        } else {
            Like::create([
                'id_user'       => auth()->user()->id,
                'id_apparel'    => $id,
            ]);
        }
    }
}
