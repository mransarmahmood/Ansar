<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('exam_slug', 60)->index();
            $table->string('exam_title', 160);
            $table->unsignedSmallInteger('score');        // correct answers
            $table->unsignedSmallInteger('total');         // total questions
            $table->unsignedTinyInteger('percentage');     // 0-100
            $table->boolean('passed')->default(false);
            $table->unsignedInteger('duration_seconds')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_attempts');
    }
};
