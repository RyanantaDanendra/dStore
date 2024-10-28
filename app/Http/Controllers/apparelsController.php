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
    public function index(Request $request) {
        //FETCH APPARELS DATA AND ID
        $apparels = Apparel::all();
        $apparelId = $apparels->pluck('id');

        // FETCH IMAGES DATA BASED ON APPARELID
        $images = Image::whereIn('id_apparel', $apparelId)->get();
        // FETCH SIZES DATA BASED ON APPARELID
        $sizes = Size::whereIn('id_apparel', $apparelId)->get();

        // FETCH THE INPUT NAMED SEARCH
        $query = $request->search;

        // SEARCH FUNCTION
        $searchApparels = Apparel::with('size')
                            -> when($query, function($q) use ($query) {
                            return $q->where('name', 'like', '%' . $query . '%')
                            ->orWhere('brand', 'like', '%' . $query . '%')
                            ->orWhereHas('size', function($q) use ($query) {
                                $q->where('size', 'like', '%' . $query . '%');
                            });
                        })->get();

        // BEST SELLING SECTION FUNCTION
        if(Order::whereIn('id_apparel', $apparelId)->exists()) {
            $bests = Order::select('id_apparel', \DB::raw('SUM(quantity) as total_quantity'))
                    ->whereNotNull('id_apparel')
                    ->groupBy('id_apparel')
                    ->orderBy('total_quantity', 'desc')
                    ->take(3)
                    ->get();

            // FETCH BEST SELLING APPAREL ID
            $bestId = $bests->pluck('id_apparel');
            // FETCH BEST SELLING APPAREL IMAGE
            $bestImages = Image::whereIn('id_apparel', $bestId)->get();
        } else {
            // FETCH THE LATEST APPAREL DATA
            $bests = Apparel::orderBy('created_at', 'desc')->limit(3)->get();

            // FETCH LATES APPAREL ID
            $bestId = $bests->pluck('id');
            // FETCH LATEST APPAREL IMAGE
            $bestImages = Image::whereIn('id_apparel', $bestId)->get();
        }

        // RETURN INERTIA PAGE
        return Inertia::render('Apparels', [
            'apparels' => $searchApparels,
            'images' => $images,
            'sizes' => $sizes,
            'search' => $query,
            'bests' => $bests,
            'bestImages' => $bestImages,
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

        // INITIATE THE $LIKED FIRST
        $liked = null;
        if(auth()->check()) {
            // CHECK IF THERE IS A LIKE DATA OF USER AND APPAREL
            $liked = Like::where('id_user', auth()->user()->id)->where('id_apparel', $apparelId)->exists();
        }

        return Inertia::render('ApparelDetails', [
            'id' => $id,
            'apparel' => $apparel,
            'images' => $images,
            'sizes' => $sizes,
            'liked' => $liked,
            'success' => session('success'),
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

            // RETURN ALERT
            return back()->with('success', 'Order placed successfully');
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
