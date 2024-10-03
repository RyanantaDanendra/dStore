<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Size extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_sneaker',
        'id_apparel',
        'size',
        'stock',
    ];

    // RELATIONS
    public function sneaker() {
        return $this->belongsToMany(Sneaker::class, 'sneaker_size');
    }

    public function apparel(): HasMany {
        return $this->hasMany(Apparel::class);
    }
}
