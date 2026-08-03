<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * List all discounts
     */
    public function index()
    {
        return response()->json(Discount::orderByDesc('created_at')->get());
    }

    /**
     * Create discount (Admin only)
     */
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:discounts,code',
            'percentage' => 'required|integer|min:1|max:100',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'valid_till' => 'required|date|after:today',
        ]);

        $discount = Discount::create($request->all());

        return response()->json([
            'message' => 'Discount created successfully',
            'discount' => $discount,
        ], 201);
    }

    /**
     * Toggle discount active/inactive (Admin only)
     */
    public function toggleStatus(Discount $discount)
    {
        $discount->update(['active' => !$discount->active]);

        return response()->json([
            'message' => 'Discount status toggled',
            'discount' => $discount,
        ]);
    }

    /**
     * Validate a discount code (Customer checkout)
     */
    public function validate_code(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $discount = Discount::where('code', $request->code)
            ->where('active', true)
            ->where('valid_till', '>=', now())
            ->first();

        if (!$discount) {
            return response()->json(['message' => 'Invalid or expired discount code'], 404);
        }

        return response()->json([
            'valid' => true,
            'discount' => $discount,
        ]);
    }

    /**
     * Delete discount (Admin only)
     */
    public function destroy(Discount $discount)
    {
        $discount->delete();
        return response()->json(['message' => 'Discount deleted']);
    }
}
