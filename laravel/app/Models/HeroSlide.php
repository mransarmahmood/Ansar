<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'image_path', 'eyebrow', 'title', 'subtitle',
        'cta_text', 'cta_link', 'published', 'sort_order',
    ];

    protected $casts = ['published' => 'boolean'];
}
