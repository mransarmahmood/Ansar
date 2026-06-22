<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageBanner extends Model
{
    protected $fillable = [
        'route', 'eyebrow', 'title', 'subtitle',
        'cta_text', 'cta_link', 'cta2_text', 'cta2_link',
        'image_path', 'published',
    ];

    protected $casts = ['published' => 'boolean'];
}
