<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account
        User::create([
            'name' => 'HerbalMart Admin',
            'email' => 'admin@herbalmart.lk',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Demo customer account
        User::create([
            'name' => 'Chaminda Silva',
            'email' => 'chaminda@herbalmart.lk',
            'password' => Hash::make('customer123'),
            'role' => 'customer',
        ]);
    }
}
