<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sneaker extends Model
{
    use HasFactory; 

    // RELATION
    public function size(): BelongsTo {
        return $this->belongsTo(Size::class);
    }

    public function image(): HasMany {
        return $this->belongsTo(Image::class);
    }
}
