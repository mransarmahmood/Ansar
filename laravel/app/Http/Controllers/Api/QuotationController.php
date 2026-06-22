<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    /** PUBLIC — submit a quotation request from the website form. */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'             => ['required', 'string', 'max:180'],
            'company'          => ['nullable', 'string', 'max:180'],
            'email'            => ['required', 'email', 'max:180'],
            'mobile'           => ['nullable', 'string', 'max:60'],
            'service_required' => ['nullable', 'string', 'max:200'],
            'notes'            => ['nullable', 'string', 'max:4000'],
        ]);
        $data['status'] = 'new';
        Quotation::create($data);

        return response()->json(['success' => true, 'message' => 'Thank you — your request has been received.'], 201);
    }

    /** ADMIN — inbox list. */
    public function index()
    {
        return response()->json(['quotations' => Quotation::orderByDesc('id')->get()]);
    }

    /** ADMIN — update status. */
    public function update(Request $request, Quotation $quotation)
    {
        $data = $request->validate(['status' => ['required', 'in:new,in-review,responded,closed']]);
        $quotation->update($data);

        return response()->json(['quotation' => $quotation->fresh()]);
    }

    public function destroy(Quotation $quotation)
    {
        $quotation->delete();

        return response()->json(['message' => 'Deleted.']);
    }
}
