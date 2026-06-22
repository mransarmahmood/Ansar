<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /** ADMIN — record a payment against an invoice. */
    public function store(Request $request, Invoice $invoice)
    {
        $data = $request->validate([
            'amount'    => ['required', 'numeric', 'min:0.01'],
            'paid_on'   => ['required', 'date'],
            'method'    => ['nullable', 'string', 'max:40'],
            'reference' => ['nullable', 'string', 'max:120'],
            'note'      => ['nullable', 'string', 'max:255'],
        ]);
        $invoice->payments()->create($data);
        $invoice->syncPaidStatus();

        return response()->json(['invoice' => $invoice->fresh()->toFull()], 201);
    }

    /** ADMIN — remove a payment. */
    public function destroy(Invoice $invoice, Payment $payment)
    {
        abort_unless($payment->invoice_id === $invoice->id, 404);
        $payment->delete();
        $invoice->syncPaidStatus();

        return response()->json(['invoice' => $invoice->fresh()->toFull()]);
    }

    /** ADMIN — billing summary tiles. */
    public function summary()
    {
        $invoices = Invoice::all();
        $invoiced = $outstanding = $paid = 0.0;
        $statusCounts = ['draft' => 0, 'sent' => 0, 'paid' => 0, 'void' => 0];

        foreach ($invoices as $inv) {
            if ($inv->status === 'void') {
                $statusCounts['void']++;
                continue;
            }
            $invoiced += $inv->total();
            $paid += $inv->amountPaid();
            $outstanding += max($inv->balance(), 0);
            $statusCounts[$inv->status] = ($statusCounts[$inv->status] ?? 0) + 1;
        }

        return response()->json([
            'invoiced' => round($invoiced, 2),
            'paid' => round($paid, 2),
            'outstanding' => round($outstanding, 2),
            'count' => $invoices->count(),
            'status_counts' => $statusCounts,
        ]);
    }
}
