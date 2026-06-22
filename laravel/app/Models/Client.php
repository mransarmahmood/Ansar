<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['company', 'contact_name', 'email', 'phone', 'address', 'notes'];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }
}
