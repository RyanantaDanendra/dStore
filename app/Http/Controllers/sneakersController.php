<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sneaker;
use App\Models\Size;
use App\Models\Image;

class sneakersController extends Controller
{
    public function sneakerDetailsPage($id) {
        $sneaker = Sneaker::find($id);
        $sneakerId = Sneaker::pluck('id');

        $sizes = Size::whereIn('id_sneaker', $sneakerId)->get();
        $images = Image::whereIn('id_sneaker', $sneakerId)->get();

        return Inertia::render('Sneakers/SneakerDetails', [
            'id' => $id,
            'sneaker' => $sneaker,
            'sizes' => $sizes,
            'images' => $images,
        ]);
    }
}
