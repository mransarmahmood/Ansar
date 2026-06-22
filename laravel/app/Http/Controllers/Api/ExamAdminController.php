<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ExamAdminController extends Controller
{
    /** All exams (incl. unpublished + full payload) for the admin. */
    public function index()
    {
        $exams = Exam::orderBy('sort_order')->get()
            ->map(fn (Exam $e) => array_merge($e->full(), [
                'id' => $e->id, 'published' => $e->published, 'sort_order' => $e->sort_order,
            ]));

        return response()->json(['exams' => $exams]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $exam = Exam::create($data);

        return response()->json(['exam' => $this->shape($exam)], 201);
    }

    public function update(Request $request, Exam $exam)
    {
        $exam->update($this->validated($request, $exam->id));

        return response()->json(['exam' => $this->shape($exam->fresh())]);
    }

    public function destroy(Exam $exam)
    {
        $exam->delete();

        return response()->json(['message' => 'Exam deleted.']);
    }

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        $data = $request->validate([
            'slug'      => ['required', 'string', 'max:60', 'regex:/^[a-z0-9-]+$/', 'unique:exams,slug' . ($ignoreId ? ",{$ignoreId}" : '')],
            'name'      => ['required', 'string', 'max:180'],
            'short'     => ['nullable', 'string', 'max:160'],
            'published' => ['boolean'],
            'payload'   => ['required', 'array'],
        ]);

        // Keep the canonical fields inside the payload in sync.
        $data['payload']['slug'] = $data['slug'];
        $data['payload']['name'] = $data['name'];
        if (! empty($data['short'])) {
            $data['payload']['short'] = $data['short'];
        }
        $data['sort_order'] = $request->input('sort_order', 0);

        return $data;
    }

    private function shape(Exam $e): array
    {
        return array_merge($e->full(), ['id' => $e->id, 'published' => $e->published]);
    }
}
