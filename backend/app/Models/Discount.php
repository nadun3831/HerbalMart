<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'percentage',
        'title',
        'description',
        'valid_till',
        'active',
    ];

    protected $casts = [
        'valid_till' => 'date',
        'active' => 'boolean',
    ];
}
