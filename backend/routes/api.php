<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| HerbalMart API Routes
|--------------------------------------------------------------------------
*/

// ─── PUBLIC ROUTES ───────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public product browsing
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/categories', [ProductController::class, 'categories']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Public discount listing
Route::get('/discounts', [DiscountController::class, 'index']);
Route::post('/discounts/validate', [DiscountController::class, 'validate_code']);

// ─── AUTHENTICATED ROUTES ────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{cartItem}', [CartController::class, 'update']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);

    // Orders (Customer places, sees own; Admin sees all)
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);

    // ─── ADMIN ONLY ROUTES ─────────────────────────────────────
    Route::middleware('admin')->group(function () {

        // Product management
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        // Order status management
        Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);

        // Discount management
        Route::post('/discounts', [DiscountController::class, 'store']);
        Route::patch('/discounts/{discount}/toggle', [DiscountController::class, 'toggleStatus']);
        Route::delete('/discounts/{discount}', [DiscountController::class, 'destroy']);

        // Admin analytics
        Route::get('/analytics/summary', function () {
            $totalRevenue = \App\Models\Order::sum('total');
            $totalOrders = \App\Models\Order::count();
            $totalProducts = \App\Models\Product::count();
            $lowStockCount = \App\Models\Product::where('stock', '<=', 5)->count();
            $activeDiscounts = \App\Models\Discount::where('active', true)->count();

            return response()->json([
                'total_revenue' => $totalRevenue,
                'total_orders' => $totalOrders,
                'total_products' => $totalProducts,
                'low_stock_count' => $lowStockCount,
                'active_discounts' => $activeDiscounts,
            ]);
        });
    });
});
