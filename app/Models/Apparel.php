<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Apparel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand', 
        'condition',
    ];

    // RELATIONS
    public function size() {
        return $this->hasMany(Size::class, 'id_apparel');
    }

    public function image() {
        return $this->hasMany(Image::class, 'id_apparel');
    }

    public function order() {
        return $this->hasMany(Order::class);
    }

    public function like() {
        return $this->HasMany(Like::class);
    }
}
