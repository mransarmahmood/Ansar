<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceAdminController extends Controller
{
    public function index()
    {
        return response()->json(['invoices' => Invoice::orderByDesc('id')->get()->map->toCard()]);
    }

    public function show(Invoice $invoice)
    {
        return response()->json(['invoice' => $invoice->toFull()]);
    }

    public function store(Request $request)
    {
        $data = $this->withClient($this->validated($request));
        $data['number'] = Invoice::newNumber();
        $data['share_token'] = Invoice::newToken();
        $invoice = Invoice::create($data);

        return response()->json(['invoice' => $invoice->toFull()], 201);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $invoice->update($this->withClient($this->validated($request)));

        return response()->json(['invoice' => $invoice->fresh()->toFull()]);
    }

    /** Copy the selected client's details into the invoice's bill-to fields. */
    private function withClient(array $data): array
    {
        if (! empty($data['client_id']) && ($c = Client::find($data['client_id']))) {
            $data['company']         = $c->company;
            $data['bill_to_name']    = $c->contact_name;
            $data['company_email']   = $c->email;
            $data['phone']           = $c->phone;
            $data['company_address'] = $c->address;
        }

        return $data;
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted.']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'client_id'       => ['nullable', 'integer', 'exists:clients,id'],
            'title'           => ['nullable', 'string', 'max:180'],
            'company'         => ['nullable', 'string', 'max:180'],
            'bill_to_name'    => ['nullable', 'string', 'max:180'],
            'company_address' => ['nullable', 'string', 'max:255'],
            'company_email'   => ['nullable', 'string', 'max:180'],
            'phone'           => ['nullable', 'string', 'max:60'],
            'invoice_date'    => ['nullable', 'date'],
            'due_date'        => ['nullable', 'date'],
            'currency'        => ['nullable', 'string', 'max:8'],
            'vat_percent'     => ['nullable', 'numeric', 'min:0', 'max:100'],
            'line_items'      => ['required', 'array', 'min:1'],
            'line_items.*.description' => ['nullable', 'string', 'max:255'],
            'line_items.*.qty'         => ['nullable', 'numeric'],
            'line_items.*.unitPrice'   => ['nullable', 'numeric'],
            'notes'           => ['nullable', 'string'],
            'terms'           => ['nullable', 'string'],
            'status'          => ['nullable', 'in:draft,sent,paid,void'],
        ]);
    }
}
