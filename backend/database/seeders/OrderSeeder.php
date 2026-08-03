<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::where('role', 'customer')->first();
        if (!$customer) return;

        $products = Product::all();

        // Order 1 - Delivered
        $order1 = Order::create([
            'user_id' => $customer->id,
            'customer_name' => 'Nimal Perera',
            'total' => 5770,
            'status' => 'Delivered',
            'shipping_address' => 'No 45, Galle Road, Colombo 03',
            'phone' => '+94 77 123 4567',
        ]);

        if ($products->count() >= 2) {
            OrderItem::create([
                'order_id' => $order1->id,
                'product_id' => $products[0]->id,
                'product_name' => $products[0]->name,
                'quantity' => 2,
                'unit_price' => 1960,
                'subtotal' => 3920,
            ]);
            OrderItem::create([
                'order_id' => $order1->id,
                'product_id' => $products[1]->id,
                'product_name' => $products[1]->name,
                'quantity' => 1,
                'unit_price' => 1850,
                'subtotal' => 1850,
            ]);
        }

        // Order 2 - Shipped
        $order2 = Order::create([
            'user_id' => $customer->id,
            'customer_name' => 'Sunethra Wickramasinghe',
            'total' => 3080,
            'status' => 'Shipped',
            'shipping_address' => 'No 12, Temple Road, Kandy',
            'phone' => '+94 71 987 6543',
        ]);

        if ($products->count() >= 5) {
            OrderItem::create([
                'order_id' => $order2->id,
                'product_id' => $products[4]->id,
                'product_name' => $products[4]->name,
                'quantity' => 1,
                'unit_price' => 3080,
                'subtotal' => 3080,
            ]);
        }
    }
}
