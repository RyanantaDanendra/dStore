<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'id_sneaker',
        'id_apparel',
    ];

    // RELATIONS
    public function sneaker() {
        return $this->belongsTo(Sneaker::class, 'id_image');
    }

    public function apparel() {
        return $this->belongsTo(Apparel::class, 'id_image');
    }
}
