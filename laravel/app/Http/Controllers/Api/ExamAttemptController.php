<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\ExamAttempt;
use Illuminate\Http\Request;

class ExamAttemptController extends Controller
{
    /** List the authenticated student's attempts (most recent first). */
    public function index(Request $request)
    {
        $attempts = $request->user()->examAttempts()
            ->latest()
            ->take(100)
            ->get(['id', 'exam_slug', 'exam_title', 'score', 'total', 'percentage', 'passed', 'duration_seconds', 'created_at']);

        return response()->json(['attempts' => $attempts]);
    }

    /** Persist a completed attempt for the authenticated student. */
    public function store(Request $request)
    {
        $data = $request->validate([
            'exam_slug'        => ['required', 'string', 'max:60'],
            'exam_title'       => ['required', 'string', 'max:160'],
            'score'            => ['required', 'integer', 'min:0', 'max:1000'],
            'total'            => ['required', 'integer', 'min:1', 'max:1000'],
            'duration_seconds' => ['nullable', 'integer', 'min:0'],
            'pass_mark'        => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $percentage = (int) round(($data['score'] / $data['total']) * 100);
        $passMark   = $data['pass_mark'] ?? 70;

        $passed = $percentage >= $passMark;

        $attempt = $request->user()->examAttempts()->create([
            'exam_slug'        => $data['exam_slug'],
            'exam_title'       => $data['exam_title'],
            'score'            => $data['score'],
            'total'            => $data['total'],
            'percentage'       => $percentage,
            'passed'           => $passed,
            'duration_seconds' => $data['duration_seconds'] ?? null,
        ]);

        // Issue a certificate on a pass.
        $certificate = null;
        if ($passed) {
            $certificate = $request->user()->certificates()->create([
                'exam_attempt_id' => $attempt->id,
                'hash'            => Certificate::newHash(),
                'holder_name'     => $request->user()->name,
                'exam_slug'       => $data['exam_slug'],
                'exam_title'      => $data['exam_title'],
                'percentage'      => $percentage,
                'issued_on'       => now()->toDateString(),
            ]);
        }

        return response()->json([
            'attempt'     => $attempt,
            'certificate' => $certificate ? ['hash' => $certificate->hash] : null,
        ], 201);
    }

    /** Summary stats for the dashboard. */
    public function stats(Request $request)
    {
        $q = $request->user()->examAttempts();

        return response()->json([
            'total_attempts' => (clone $q)->count(),
            'exams_taken'    => (clone $q)->distinct('exam_slug')->count('exam_slug'),
            'passed'         => (clone $q)->where('passed', true)->count(),
            'best_score'     => (int) ((clone $q)->max('percentage') ?? 0),
        ]);
    }
}
