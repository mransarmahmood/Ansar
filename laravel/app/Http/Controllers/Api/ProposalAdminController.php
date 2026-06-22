<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Proposal;
use Illuminate\Http\Request;

class ProposalAdminController extends Controller
{
    public function index()
    {
        return response()->json(['proposals' => Proposal::orderByDesc('id')->get()->map->toCard()]);
    }

    public function show(Proposal $proposal)
    {
        return response()->json(['proposal' => $proposal->toFull()]);
    }

    public function store(Request $request)
    {
        $data = $this->withClient($this->validated($request));
        $data['number'] = Proposal::newNumber();
        $data['share_token'] = Proposal::newToken();
        $proposal = Proposal::create($data);

        return response()->json(['proposal' => $proposal->toFull()], 201);
    }

    public function update(Request $request, Proposal $proposal)
    {
        $proposal->update($this->withClient($this->validated($request)));

        return response()->json(['proposal' => $proposal->fresh()->toFull()]);
    }

    private function withClient(array $data): array
    {
        if (! empty($data['client_id']) && ($c = Client::find($data['client_id']))) {
            $data['company_name']    = $c->company;
            $data['contact_name']    = $c->contact_name;
            $data['company_email']   = $c->email;
            $data['phone']           = $c->phone;
            $data['company_address'] = $c->address;
        }

        return $data;
    }

    public function destroy(Proposal $proposal)
    {
        $proposal->delete();

        return response()->json(['message' => 'Proposal deleted.']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'client_id'       => ['nullable', 'integer', 'exists:clients,id'],
            'title'           => ['nullable', 'string', 'max:180'],
            'company_name'    => ['nullable', 'string', 'max:180'],
            'contact_name'    => ['nullable', 'string', 'max:180'],
            'company_address' => ['nullable', 'string', 'max:255'],
            'company_email'   => ['nullable', 'string', 'max:180'],
            'phone'           => ['nullable', 'string', 'max:60'],
            'proposal_date'   => ['nullable', 'date'],
            'subject'         => ['nullable', 'string', 'max:255'],
            'body'            => ['nullable', 'string'],
            'line_items'      => ['nullable', 'array'],
            'currency'        => ['nullable', 'string', 'max:8'],
            'terms'           => ['nullable', 'string'],
            'status'          => ['nullable', 'in:draft,sent,accepted,declined'],
        ]);
    }
}
