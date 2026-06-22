<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SlideAdminController extends Controller
{
    public function index()
    {
        return response()->json(['slides' => HeroSlide::orderBy('sort_order')->orderBy('id')->get()]);
    }

    public function store(Request $request)
    {
        $slide = HeroSlide::create($this->validated($request));

        return response()->json(['slide' => $slide], 201);
    }

    public function update(Request $request, HeroSlide $slide)
    {
        $slide->update($this->validated($request));

        return response()->json(['slide' => $slide->fresh()]);
    }

    public function destroy(HeroSlide $slide)
    {
        $slide->delete();

        return response()->json(['message' => 'Slide deleted.']);
    }

    /** Upload a banner image → returns its public URL under /ansar-api/uploads/slides. */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:6144'],
        ]);

        $dir = public_path('uploads/slides');
        if (! is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }

        $file = $request->file('image');
        $name = Str::random(12) . '_' . time() . '.' . strtolower($file->getClientOriginalExtension());
        $file->move($dir, $name);

        // Absolute URL based on APP_URL so images resolve in any environment
        // (local: http://localhost/ansar-api/uploads/… · prod: https://api.ansarmahmood.org/uploads/…).
        return response()->json(['url' => rtrim(config('app.url'), '/') . '/uploads/slides/' . $name]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'image_path' => ['nullable', 'string', 'max:300'],
            'eyebrow'    => ['nullable', 'string', 'max:160'],
            'title'      => ['nullable', 'string', 'max:180'],
            'subtitle'   => ['nullable', 'string', 'max:200'],
            'cta_text'   => ['nullable', 'string', 'max:80'],
            'cta_link'   => ['nullable', 'string', 'max:200'],
            'published'  => ['boolean'],
            'sort_order' => ['integer'],
        ]);
    }
}
