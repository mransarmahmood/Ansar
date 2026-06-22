<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    protected $fillable = [
        'name', 'company', 'email', 'mobile', 'service_required', 'notes', 'status',
    ];
}
