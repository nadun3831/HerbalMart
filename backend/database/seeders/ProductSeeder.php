<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Neelibringadi Hair Growth & Scalp Oil',
                'category' => 'Herbal Oils',
                'price' => 2450.00,
                'discount_price' => 1960.00,
                'stock' => 42,
                'rating' => 4.9,
                'reviews_count' => 128,
                'status' => 'active',
                'image' => 'https://images.unsplash.com/photo-1608248597263-00079e96047a?auto=format&fit=crop&w=600&q=80',
                'short_description' => 'Traditional Ayurvedic formulation enriched with Indigo and Bhringraj to reduce hair fall.',
                'ingredients' => json_encode(['Indigofera tinctoria (Neeli)', 'Eclipta alba (Bhringraj)', 'Phyllanthus emblica (Amla)', 'Virgin Coconut Oil']),
            ],
            [
                'name' => 'Ceylon Herbal Samahan Spice Infusion Tea',
                'category' => 'Ayurvedic Teas',
                'price' => 1850.00,
                'discount_price' => null,
                'stock' => 85,
                'rating' => 4.8,
                'reviews_count' => 210,
                'status' => 'active',
                'image' => 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
                'short_description' => 'Soothing instant soluble herbal tea formula containing 14 authentic ayurvedic herbs.',
                'ingredients' => json_encode(['Coriandrum sativum', 'Ginger', 'Black Pepper', 'Licorice', 'Alpinia galanga']),
            ],
            [
                'name' => 'Pure Ashwagandha Root Powder',
                'category' => 'Organic Powders',
                'price' => 3200.00,
                'discount_price' => 2720.00,
                'stock' => 18,
                'rating' => 4.9,
                'reviews_count' => 94,
                'status' => 'active',
                'image' => 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
                'short_description' => 'Premium organic Ashwagandha root powder to promote deep sleep and reduce cortisol.',
                'ingredients' => json_encode(['100% Organic Ashwagandha Root Powder']),
            ],
            [
                'name' => 'Gotukola & Moringa Immunity Capsules',
                'category' => 'Wellness Capsules',
                'price' => 2900.00,
                'discount_price' => null,
                'stock' => 4,
                'rating' => 4.7,
                'reviews_count' => 56,
                'status' => 'active',
                'image' => 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
                'short_description' => 'Synergistic blend of Gotukola and Moringa. Enhances brain alertness and memory.',
                'ingredients' => json_encode(['Gotukola Extract (250mg)', 'Moringa Powder (250mg)', 'Vegetable Capsule Shell']),
            ],
            [
                'name' => 'Wild Turmeric & Chandan Brightening Face Elixir',
                'category' => 'Skincare',
                'price' => 3850.00,
                'discount_price' => 3080.00,
                'stock' => 31,
                'rating' => 5.0,
                'reviews_count' => 142,
                'status' => 'active',
                'image' => 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
                'short_description' => 'Pure Wild Turmeric & Sandalwood facial oil. Fades dark spots for radiant glow.',
                'ingredients' => json_encode(['Kasturi Manjal Extract', 'Red Sandalwood Oil', 'Jojoba Oil', 'Vitamin E']),
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
