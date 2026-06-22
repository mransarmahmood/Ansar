<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Proposal extends Model
{
    protected $fillable = [
        'client_id', 'number', 'share_token', 'title', 'company_name', 'contact_name', 'company_address',
        'company_email', 'phone', 'proposal_date', 'subject', 'body', 'line_items',
        'currency', 'terms', 'status',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    protected $casts = [
        'line_items'    => 'array',
        'proposal_date' => 'date',
    ];

    public static function newNumber(): string
    {
        $year = date('Y');
        $count = static::whereYear('created_at', $year)->count() + 1;
        return sprintf('PROP-%s-%04d', $year, $count);
    }

    public static function newToken(): string
    {
        return strtoupper(Str::random(16));
    }

    public function total(): float
    {
        return collect($this->line_items ?? [])
            ->reduce(fn ($s, $l) => $s + (float) ($l['qty'] ?? 0) * (float) ($l['unitPrice'] ?? 0), 0.0);
    }

    public function toCard(): array
    {
        return [
            'id' => $this->id, 'number' => $this->number, 'title' => $this->title,
            'company_name' => $this->company_name, 'status' => $this->status,
            'proposal_date' => optional($this->proposal_date)->toDateString(),
            'total' => $this->total(), 'currency' => $this->currency, 'share_token' => $this->share_token,
        ];
    }

    public function toFull(): array
    {
        return array_merge($this->toArray(), ['total' => $this->total()]);
    }
}
