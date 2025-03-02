<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Empleado extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'email',
        'password',
        'dni',
    ];

    protected $hidden = [
        'password',
    ];
}
