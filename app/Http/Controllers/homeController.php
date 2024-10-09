<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Sneaker;
use App\Models\Image;
use App\Models\Apparel;

class homeController extends Controller
{
    public function index() {
        // FETCH SNEAKERS DATA
        $sneakers = Sneaker::limit(8)->get();
        
        // FRTCH APPARELS DATA
        $apparels = Apparel::limit(8)->get();

        // FETCH APPAREL ID
        $sneakerId = Sneaker::pluck('id');

        // FETCH SNEAKER IMAGE
        $images = Image::whereIn('id_sneaker', $sneakerId)->get();

        return Inertia::render('Home', [
            'sneakers' => $sneakers,
            'images' => $images,
            'apparels' => $apparels,
        ]);
    }
}
