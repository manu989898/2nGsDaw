<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Role;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

  
    public function role(){
        return $this->belongsTo(Role::class);
    }
    public function comment(){
        return $this->hasMany(Comment::class);
    }
    public function spaces(){
        return $this->hasMany(Space::class);
    }
}
