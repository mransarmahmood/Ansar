<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = ['slug', 'name', 'short', 'published', 'sort_order', 'payload'];

    protected $casts = [
        'payload'   => 'array',
        'published' => 'boolean',
    ];

    /** Public summary (no questions/answers). */
    public function summary(): array
    {
        $p = $this->payload ?? [];
        $count = count($p['sampleQuestions'] ?? []);
        unset($p['sampleQuestions']);

        return array_merge($p, [
            'slug' => $this->slug,
            'name' => $this->name,
            'short' => $this->short,
            'sampleQuestionCount' => $count,
        ]);
    }

    /** Full exam object for the quiz runner (includes sampleQuestions). */
    public function full(): array
    {
        return array_merge($this->payload ?? [], [
            'slug' => $this->slug,
            'name' => $this->name,
            'short' => $this->short,
        ]);
    }
}
