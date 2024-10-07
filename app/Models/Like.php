<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_sneaker',
    ];

    // RELATIONS
    public function user() {
        return $this->hasMany(User::class);
    }

    public function sneaker() {
        return $this->hasMany(UsSneakerr::class);
    }
    
    public function apparel() {
        return $this->hasMany(Apparel::class);
    }
}
