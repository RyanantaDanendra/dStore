<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user', 
        'id_sneaker', 
        'id_apparel',
        'id_size', 
        'quantity'
    ];

    // RELATIONS
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function sneaker() {
        return $this->BelongsTo(Sneaker::class, 'id_sneaker');
    }

    public function apparel() {
        return $this->BelongsTo(Apparel::class, 'id_apparel');
    }
}
