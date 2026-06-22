<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Certificate extends Model
{
    protected $fillable = [
        'user_id', 'exam_attempt_id', 'hash', 'holder_name',
        'exam_slug', 'exam_title', 'percentage', 'issued_on',
    ];

    protected $casts = [
        'issued_on' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** Generate a unique, human-friendly verification hash, e.g. AM-7F3K9Q2X. */
    public static function newHash(): string
    {
        do {
            $hash = 'AM-' . strtoupper(Str::random(8));
        } while (static::where('hash', $hash)->exists());

        return $hash;
    }
}
