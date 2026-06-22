<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Proposal;
use Barryvdh\DomPDF\Facade\Pdf;

class BillingController extends Controller
{
    /** PUBLIC — view an invoice by its share token. */
    public function showInvoice(string $token)
    {
        $invoice = Invoice::where('share_token', $token)->first();
        if (! $invoice) {
            return response()->json(['message' => 'Invoice not found.'], 404);
        }

        return response()->json(['invoice' => $invoice->toFull()]);
    }

    /** PUBLIC — download an invoice PDF. */
    public function invoicePdf(string $token)
    {
        $invoice = Invoice::where('share_token', $token)->firstOrFail();
        $pdf = Pdf::loadView('billing.invoice', ['inv' => $invoice])->setPaper('a4');

        return $pdf->download($invoice->number . '.pdf');
    }

    /** PUBLIC — payment receipt PDF for an invoice (all payments received). */
    public function receiptPdf(string $token)
    {
        $invoice = Invoice::where('share_token', $token)->firstOrFail();
        $pdf = Pdf::loadView('billing.receipt', ['inv' => $invoice])->setPaper('a4');

        return $pdf->download('RECEIPT-' . $invoice->number . '.pdf');
    }

    /** PUBLIC — view a proposal by its share token. */
    public function showProposal(string $token)
    {
        $proposal = Proposal::where('share_token', $token)->first();
        if (! $proposal) {
            return response()->json(['message' => 'Proposal not found.'], 404);
        }

        return response()->json(['proposal' => $proposal->toFull()]);
    }

    /** PUBLIC — download a proposal PDF. */
    public function proposalPdf(string $token)
    {
        $proposal = Proposal::where('share_token', $token)->firstOrFail();
        $pdf = Pdf::loadView('billing.proposal', ['p' => $proposal])->setPaper('a4');

        return $pdf->download($proposal->number . '.pdf');
    }
}
