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
    public function size(): HasMany {
        return $this->HasMany(Size::class);
    }

    public function image(): HasOne {
        return $this->hasOne(Image::class);
    }

    public function order(): HasMany {
        return $this->hasMany(Order::class);
    }

    public function like(): HasMany {
        return $this->HasMany(Like::class);
    }
}
