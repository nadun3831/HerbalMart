<?php

namespace App\Http\Controllers;

use App\Mail\OrderConfirmationMail;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * List orders - Admin sees all, Customer sees own
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $orders = Order::with('items')->orderByDesc('created_at')->get();
        } else {
            $orders = $user->orders()->with('items')->orderByDesc('created_at')->get();
        }

        return response()->json($orders);
    }

    /**
     * Create a new order (Customer checkout)
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $user = $request->user();
        $total = 0;
        $orderItems = [];

        foreach ($request->items as $item) {
            $product = Product::findOrFail($item['product_id']);
            $unitPrice = $product->discount_price ?? $product->price;
            $subtotal = $unitPrice * $item['quantity'];
            $total += $subtotal;

            $orderItems[] = [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => $item['quantity'],
                'unit_price' => $unitPrice,
                'subtotal' => $subtotal,
            ];

            // Reduce stock
            $product->decrement('stock', $item['quantity']);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'customer_name' => $user->name,
            'total' => $total,
            'status' => 'Pending',
            'shipping_address' => $request->shipping_address,
            'phone' => $request->phone,
        ]);

        foreach ($orderItems as $item) {
            $order->items()->create($item);
        }

        // Clear user cart after checkout
        $user->cartItems()->delete();

        // Send order confirmation email to customer
        try {
            Mail::to($user->email)->send(new OrderConfirmationMail($order->load('items'), $user));
        } catch (\Exception $e) {
            // Log the error but don't fail the order
            \Log::warning('Order confirmation email failed: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order->load('items'),
        ], 201);
    }

    /**
     * Show single order
     */
    public function show(Request $request, Order $order)
    {
        $user = $request->user();

        if (!$user->isAdmin() && $order->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order->load('items'));
    }

    /**
     * Update order status (Admin only)
     */
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:Pending,Processing,Shipped,Delivered',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Order status updated',
            'order' => $order,
        ]);
    }
}
