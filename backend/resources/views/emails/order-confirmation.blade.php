<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation — HerbalMart</title>
</head>
<body style="margin: 0; padding: 0; background-color: #101415; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

    <!-- Wrapper Table -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #101415; padding: 40px 0;">
        <tr>
            <td align="center">

                <!-- Main Container -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #1d2022; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 60px rgba(0,0,0,0.5);">

                    <!-- Header with Logo -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #064e3b 0%, #101415 100%); padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid rgba(132,204,22,0.3);">
                            <div style="display: inline-block; width: 56px; height: 56px; background-color: rgba(6,78,59,0.8); border: 2px solid rgba(132,204,22,0.4); border-radius: 16px; line-height: 56px; font-size: 28px; margin-bottom: 16px;">
                                🌿
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                                HerbalMart
                            </h1>
                            <p style="margin: 6px 0 0; color: rgba(132,204,22,0.8); font-size: 11px; letter-spacing: 3px; font-weight: 600;">
                                ORGANIC BOTANICAL AYURVEDA
                            </p>
                        </td>
                    </tr>

                    <!-- Success Badge -->
                    <tr>
                        <td style="padding: 30px 40px 10px; text-align: center;">
                            <div style="display: inline-block; width: 60px; height: 60px; background-color: rgba(132,204,22,0.15); border: 2px solid rgba(132,204,22,0.3); border-radius: 50%; line-height: 60px; font-size: 30px;">
                                ✅
                            </div>
                            <h2 style="margin: 16px 0 6px; color: #ffffff; font-size: 22px; font-weight: 700;">
                                Order Confirmed!
                            </h2>
                            <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                                Thank you for your order, <strong style="color: #84cc16;">{{ $customer->name }}</strong>!<br>
                                Your order has been placed successfully.
                            </p>
                        </td>
                    </tr>

                    <!-- Order Info Card -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #101415; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="color: #94a3b8; font-size: 12px; font-weight: 600; padding-bottom: 4px;">ORDER NUMBER</td>
                                                <td style="color: #94a3b8; font-size: 12px; font-weight: 600; padding-bottom: 4px; text-align: right;">DATE</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #84cc16; font-size: 18px; font-weight: 800;">#{{ $order->id }}</td>
                                                <td style="color: #e0e3e5; font-size: 14px; font-weight: 600; text-align: right;">{{ $order->created_at->format('d M Y, h:i A') }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-top: 1px solid rgba(255,255,255,0.08); padding: 16px 20px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="50%" style="vertical-align: top;">
                                                    <p style="margin: 0 0 2px; color: #94a3b8; font-size: 11px; font-weight: 600;">STATUS</p>
                                                    <span style="display: inline-block; background-color: rgba(132,204,22,0.15); color: #84cc16; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(132,204,22,0.3);">
                                                        {{ $order->status }}
                                                    </span>
                                                </td>
                                                <td width="50%" style="vertical-align: top; text-align: right;">
                                                    <p style="margin: 0 0 2px; color: #94a3b8; font-size: 11px; font-weight: 600;">PAYMENT</p>
                                                    <p style="margin: 0; color: #e0e3e5; font-size: 13px; font-weight: 600;">Cash on Delivery</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Order Items -->
                    <tr>
                        <td style="padding: 10px 40px 20px;">
                            <h3 style="margin: 0 0 12px; color: #ffffff; font-size: 15px; font-weight: 700;">
                                📦 Items Ordered
                            </h3>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #101415; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">

                                <!-- Table Header -->
                                <tr style="background-color: rgba(255,255,255,0.04);">
                                    <td style="padding: 12px 16px; color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;">PRODUCT</td>
                                    <td style="padding: 12px 16px; color: #94a3b8; font-size: 11px; font-weight: 700; text-align: center; letter-spacing: 0.5px;">QTY</td>
                                    <td style="padding: 12px 16px; color: #94a3b8; font-size: 11px; font-weight: 700; text-align: right; letter-spacing: 0.5px;">PRICE</td>
                                </tr>

                                <!-- Item Rows -->
                                @foreach ($order->items as $item)
                                <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
                                    <td style="padding: 14px 16px; color: #e0e3e5; font-size: 13px; font-weight: 600;">
                                        {{ $item->product_name }}
                                    </td>
                                    <td style="padding: 14px 16px; color: #94a3b8; font-size: 13px; text-align: center;">
                                        x{{ $item->quantity }}
                                    </td>
                                    <td style="padding: 14px 16px; color: #e0e3e5; font-size: 13px; font-weight: 600; text-align: right;">
                                        Rs. {{ number_format($item->subtotal, 2) }}
                                    </td>
                                </tr>
                                @endforeach

                                <!-- Total Row -->
                                <tr style="border-top: 2px solid rgba(132,204,22,0.3);">
                                    <td colspan="2" style="padding: 16px; color: #ffffff; font-size: 15px; font-weight: 800;">
                                        Grand Total
                                    </td>
                                    <td style="padding: 16px; color: #84cc16; font-size: 18px; font-weight: 800; text-align: right;">
                                        Rs. {{ number_format($order->total, 2) }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Shipping Info -->
                    @if ($order->shipping_address || $order->phone)
                    <tr>
                        <td style="padding: 0 40px 20px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #101415; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="margin: 0 0 12px; color: #ffffff; font-size: 14px; font-weight: 700;">
                                            🚚 Delivery Details
                                        </h3>
                                        @if ($order->shipping_address)
                                        <p style="margin: 0 0 8px; color: #94a3b8; font-size: 13px; line-height: 1.5;">
                                            <strong style="color: #e0e3e5;">Address:</strong> {{ $order->shipping_address }}
                                        </p>
                                        @endif
                                        @if ($order->phone)
                                        <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                                            <strong style="color: #e0e3e5;">Phone:</strong> {{ $order->phone }}
                                        </p>
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    @endif

                    <!-- CTA -->
                    <tr>
                        <td style="padding: 10px 40px 10px; text-align: center;">
                            <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
                                Your order is being processed and will be dispatched soon.<br>
                                We'll keep you updated every step of the way!
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.08);">
                            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 11px;">
                                Thank you for choosing <strong style="color: #84cc16;">HerbalMart</strong> 🌿
                            </p>
                            <p style="margin: 0; color: #64748b; font-size: 10px;">
                                © {{ date('Y') }} HerbalMart — Organic Botanical Ayurveda<br>
                                This is an automated email. Please do not reply.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
