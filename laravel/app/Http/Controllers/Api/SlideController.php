<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;

class SlideController extends Controller
{
    /** Public — published hero slides in order. */
    public function index()
    {
        $slides = HeroSlide::where('published', true)
            ->orderBy('sort_order')->orderBy('id')
            ->get(['id', 'image_path', 'eyebrow', 'title', 'subtitle', 'cta_text', 'cta_link']);

        return response()->json(['slides' => $slides]);
    }
}
