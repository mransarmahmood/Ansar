<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('image_path')->nullable();   // /ansar-api/uploads/slides/x.jpg
            $table->string('eyebrow', 160)->nullable();
            $table->string('title', 180)->nullable();
            $table->string('subtitle', 200)->nullable();
            $table->string('cta_text', 80)->nullable();
            $table->string('cta_link', 200)->nullable();
            $table->boolean('published')->default(true);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
