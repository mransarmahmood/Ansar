<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageBannerController extends Controller
{
    /** PUBLIC — all published banners, keyed by route for the SPA. */
    public function index()
    {
        $banners = PageBanner::where('published', true)->get()
            ->keyBy('route')
            ->map(fn ($b) => $b->only([
                'route', 'eyebrow', 'title', 'subtitle',
                'cta_text', 'cta_link', 'cta2_text', 'cta2_link', 'image_path',
            ]));

        return response()->json(['banners' => $banners]);
    }

    /** ADMIN — full list. */
    public function adminIndex()
    {
        return response()->json(['banners' => PageBanner::orderBy('route')->get()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request, null);
        $banner = PageBanner::updateOrCreate(['route' => $data['route']], $data);

        return response()->json(['banner' => $banner], 201);
    }

    public function update(Request $request, PageBanner $page_banner)
    {
        $page_banner->update($this->validated($request, $page_banner->id));

        return response()->json(['banner' => $page_banner->fresh()]);
    }

    public function destroy(PageBanner $page_banner)
    {
        $page_banner->delete();

        return response()->json(['message' => 'Banner deleted.']);
    }

    /** Upload a banner background image → URL under /uploads/banners. */
    public function upload(Request $request)
    {
        $request->validate(['image' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:6144']]);

        $dir = public_path('uploads/banners');
        if (! is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }
        $file = $request->file('image');
        $name = Str::random(12) . '_' . time() . '.' . strtolower($file->getClientOriginalExtension());
        $file->move($dir, $name);

        return response()->json(['url' => rtrim(config('app.url'), '/') . '/uploads/banners/' . $name]);
    }

    private function validated(Request $request, ?int $ignoreId): array
    {
        return $request->validate([
            'route'      => ['required', 'string', 'max:80', 'regex:/^[a-z0-9-]+$/'],
            'eyebrow'    => ['nullable', 'string', 'max:120'],
            'title'      => ['nullable', 'string', 'max:200'],
            'subtitle'   => ['nullable', 'string', 'max:400'],
            'cta_text'   => ['nullable', 'string', 'max:80'],
            'cta_link'   => ['nullable', 'string', 'max:200'],
            'cta2_text'  => ['nullable', 'string', 'max:80'],
            'cta2_link'  => ['nullable', 'string', 'max:200'],
            'image_path' => ['nullable', 'string', 'max:300'],
            'published'  => ['boolean'],
        ]);
    }
}
