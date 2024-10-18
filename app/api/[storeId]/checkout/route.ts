import Stripe from "stripe";
import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prismaDB";
import { stripe } from "@/lib/stripe";

const corsHeaders= {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: corsHeaders
    });
}

export async function POST(
    req: Request,
    { params } : { params: { storeId: string } }
) {
    try {

        const {
            productsIds
        } = await req.json();

        if (!productsIds || productsIds.length === 0) {
            return new NextResponse("Product not found.", {
                status: 400,
            })
        }

        const products = await prismadb.product.findMany({
            where: {
                id: {
                    in: productsIds
                }
            }
        })

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        products.forEach((product) => {
            line_items.push({
                quantity:1,
                price_data: {
                    currency:"USD",
                    product_data:{
                        name: product.name,
                        // description: ""
                    },
                    unit_amount: product.price * 100,
                },
            });
        })

        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false,
                orderItem: {
                    create: productsIds.map((productId: string) => ({
                        product: {
                            connect: {
                                id: productId
                            }
                        }
                    }))
                }
            }
        });

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.STORE_URL}/cart?sucess=1`,
            cancel_url: `${process.env.STORE_URL}/cart?canceled=1`,
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true
            },
            metadata: {
                orderId: order.id
            }
        });

        return NextResponse.json({ url: stripeSession.url }, {
                headers: corsHeaders
            }
        )

    } catch (error) {
        console.log("[STRIPE ERROR]", error)
        return new NextResponse("Internal Server Error", {
            status: 500
        })
    }
}