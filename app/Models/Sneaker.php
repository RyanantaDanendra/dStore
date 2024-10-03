<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Sneaker extends Model
{
    use HasFactory; 

    protected $fillable = [
        'name',
        'brand',
        'condition',
        'size',
        'stock',
    ];

    // RELATION
    public function size() {
        return $this->belongsToMany(Size::class, 'sneaker_size');
    }

    public function image(): HasOne {
        return $this->hasOne(Image::class, 'id');
    }
}
