<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientAdminController extends Controller
{
    public function index()
    {
        $clients = Client::orderBy('company')->withCount(['invoices', 'proposals'])->get();

        return response()->json(['clients' => $clients]);
    }

    public function store(Request $request)
    {
        return response()->json(['client' => Client::create($this->validated($request))], 201);
    }

    public function update(Request $request, Client $client)
    {
        $client->update($this->validated($request));

        return response()->json(['client' => $client->fresh()]);
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json(['message' => 'Client deleted.']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'company'      => ['required', 'string', 'max:180'],
            'contact_name' => ['nullable', 'string', 'max:180'],
            'email'        => ['nullable', 'email', 'max:180'],
            'phone'        => ['nullable', 'string', 'max:60'],
            'address'      => ['nullable', 'string', 'max:255'],
            'notes'        => ['nullable', 'string'],
        ]);
    }
}
