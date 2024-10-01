<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sneaker;
use App\Models\Size;
use App\Models\Image;
use App\Models\Order;
use App\Models\Like;

class sneakersController extends Controller
{
    public function sneakerDetailsPage($id) {
        $sneaker = Sneaker::find($id);
        $sneakerId = Sneaker::pluck('id');

        $sizes = Size::whereIn('id_sneaker', $sneakerId)->get();
        $images = Image::whereIn('id_sneaker', $sneakerId)->get();
        $liked = null;
        if(auth()->check()) {
            $liked = Like::where('id_user', auth()->user()->id)->where('id_sneaker', $sneakerId)->exists();
        }

        return Inertia::render('Sneakers/SneakerDetails', [
            'id' => $id,
            'sneaker' => $sneaker,
            'sizes' => $sizes,
            'images' => $images,
            'liked' => $liked,
        ]);
    }

    public function orderSneaker($id, Request $request) {
        // $validatedData = $request->validate([
        //     'id_sneaker' => 'required|integer',
        //     'id_apparel' => 'nullable|integer',
        //     'id_size' => 'required|integer',
        //     'quantity' => 'required|integer|min:1',
        // ]);

        Order::create([
            'id_user' => auth()->user()->id,
            'id_sneaker' => $id,
            'id_size' => $request->id_size,
            'quantity' => $request->quantity,
        ]);

        $size = Size::where('id_sneaker', $id)->where('id', $request->id_size)->first();

        if($size) {
            $size->stock -= $request->quantity;

            $size->save();
        } else {
            return back()->withErrors(['size' => 'Size not found for this sneaker']);
        }

        return back()->with('success', 'Order placed successfully');
    }

    public function like($id) {
        $liked = Like::where('id_user', auth()->user()->id)->where('id_sneaker',  $id)->first();

        if($liked) {
            $liked->delete();
        } else {
            Like::create([
                'id_user' => auth()->user()->id,
                'id_sneaker' => $id,
            ]);
        }
    }
}
