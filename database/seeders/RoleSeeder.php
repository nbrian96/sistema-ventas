<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'vendedor']);
        Role::create(['name' => 'cliente']);
        Role::create(['name' => 'super-admin']);
    }
}

