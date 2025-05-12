<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::firstOrCreate(['name' => 'super-admin']);

        $user = User::create([
            'name' => 'Mr B.',
            'last_name' => 'Avila',
            'email' => 'nbrian.avila96@gmail.com',
            'password' => Hash::make('sigead12345@'),
        ]);

        $user->assignRole($role);
    }
}
