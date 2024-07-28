<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Like extends Model
{
    use HasFactory;

    // RELATIONS
    public function user(): HasMany {
        return $this->hasMany(User::class);
    }

    public function sneaker(): HasMany {
        return $this->hasMany(UsSneakerr::class);
    }
    
    public function apparel(): HasMany {
        return $this->hasMany(Apparel::class);
    }
}
