<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Sneaker;
use App\Models\Image;

class homeController extends Controller
{
    public function index() {
        $sneakers = Sneaker::all();

        // FETCH APPAREL ID
        $sneakerId = Sneaker::pluck('id');

        // FETCH SNEAKER IMAGE
        $images = Image::whereIn('id_sneaker', $sneakerId)->get();

        return Inertia::render('Home', [
            'sneakers' => $sneakers,
            'images' => $images,
        ]);
    }
}
