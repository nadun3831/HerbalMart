<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Get user's cart with product details
     */
    public function index(Request $request)
    {
        $items = $request->user()
            ->cartItems()
            ->with('product')
            ->get();

        return response()->json($items);
    }

    /**
     * Add item to cart (or increment quantity)
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $request->product_id,
            ],
            [
                'quantity' => \DB::raw('quantity + ' . ($request->quantity ?? 1)),
            ]
        );

        // Reload to get fresh data
        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->where('product_id', $request->product_id)
            ->with('product')
            ->first();

        return response()->json([
            'message' => 'Item added to cart',
            'cart_item' => $cartItem,
        ]);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate(['quantity' => 'required|integer|min:1']);

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Cart updated',
            'cart_item' => $cartItem->load('product'),
        ]);
    }

    /**
     * Remove item from cart
     */
    public function destroy(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    /**
     * Clear entire cart
     */
    public function clear(Request $request)
    {
        $request->user()->cartItems()->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
}
