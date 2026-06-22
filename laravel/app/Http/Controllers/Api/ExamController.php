<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exam;

class ExamController extends Controller
{
    /** Public list of published exams (no questions/answers). */
    public function index()
    {
        $exams = Exam::where('published', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Exam $e) => $e->summary());

        return response()->json(['exams' => $exams]);
    }

    /** Public single exam (full payload incl. sampleQuestions) for the quiz runner. */
    public function show(string $slug)
    {
        $exam = Exam::where('slug', $slug)->where('published', true)->first();
        if (! $exam) {
            return response()->json(['message' => 'Exam not found.'], 404);
        }

        return response()->json(['exam' => $exam->full()]);
    }
}
