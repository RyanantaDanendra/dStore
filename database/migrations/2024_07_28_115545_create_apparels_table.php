<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apparels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('id_size')->nullable();
            $table->integer('id_image')->nullable();
            $table->string('brand');
            $table->string('condition');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apparels');
    }
};
