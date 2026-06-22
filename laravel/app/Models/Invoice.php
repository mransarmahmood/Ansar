<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invoice extends Model
{
    protected $fillable = [
        'client_id', 'number', 'share_token', 'title', 'company', 'bill_to_name', 'company_address',
        'company_email', 'phone', 'invoice_date', 'due_date', 'currency', 'vat_percent',
        'line_items', 'notes', 'terms', 'status',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class)->orderBy('paid_on');
    }

    public function amountPaid(): float
    {
        return round((float) $this->payments()->sum('amount'), 2);
    }

    public function balance(): float
    {
        return round($this->total() - $this->amountPaid(), 2);
    }

    protected $casts = [
        'line_items'   => 'array',
        'vat_percent'  => 'float',
        'invoice_date' => 'date',
        'due_date'     => 'date',
    ];

    public static function newNumber(): string
    {
        $year = date('Y');
        $count = static::whereYear('created_at', $year)->count() + 1;
        return sprintf('INV-%s-%04d', $year, $count);
    }

    public static function newToken(): string
    {
        return strtoupper(Str::random(16));
    }

    public function subtotal(): float
    {
        return collect($this->line_items ?? [])
            ->reduce(fn ($s, $l) => $s + (float) ($l['qty'] ?? 0) * (float) ($l['unitPrice'] ?? 0), 0.0);
    }

    public function vatAmount(): float
    {
        return round($this->subtotal() * ((float) $this->vat_percent) / 100, 2);
    }

    public function total(): float
    {
        return round($this->subtotal() + $this->vatAmount(), 2);
    }

    public function toCard(): array
    {
        return [
            'id' => $this->id, 'number' => $this->number, 'title' => $this->title,
            'company' => $this->company, 'status' => $this->status, 'currency' => $this->currency,
            'invoice_date' => optional($this->invoice_date)->toDateString(),
            'due_date' => optional($this->due_date)->toDateString(),
            'total' => $this->total(), 'amount_paid' => $this->amountPaid(), 'balance' => $this->balance(),
            'share_token' => $this->share_token,
        ];
    }

    public function toFull(): array
    {
        return array_merge($this->toArray(), [
            'subtotal' => $this->subtotal(), 'vat_amount' => $this->vatAmount(), 'total' => $this->total(),
            'amount_paid' => $this->amountPaid(), 'balance' => $this->balance(),
            'payments' => $this->payments()->get(),
        ]);
    }

    /** Recompute status from payments (paid when fully settled). */
    public function syncPaidStatus(): void
    {
        if ($this->status === 'void') {
            return;
        }
        $paid = $this->amountPaid();
        if ($paid > 0 && $this->balance() <= 0.001) {
            $this->status = 'paid';
        } elseif ($this->status === 'paid' && $this->balance() > 0.001) {
            $this->status = 'sent';
        }
        $this->save();
    }
}
