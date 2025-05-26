<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, HasRoles, Notifiable;

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'phone',
        'document_type',
        'document_number',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn() => "{$this->name} {$this->last_name}"
        );
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
