<?php

namespace Database\Seeders;

use App\Models\Discount;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    public function run(): void
    {
        Discount::create([
            'code' => 'HERBAL20',
            'percentage' => 20,
            'title' => 'Monsoon Hair Care Special',
            'description' => '20% OFF on Neelibringadi Scalp & Hair Growth Oil.',
            'valid_till' => '2026-12-31',
            'active' => true,
        ]);

        Discount::create([
            'code' => 'ASHWA15',
            'percentage' => 15,
            'title' => 'Ashwagandha Saver',
            'description' => '15% OFF on Organic Ashwagandha Root Powder.',
            'valid_till' => '2026-11-30',
            'active' => true,
        ]);
    }
}
