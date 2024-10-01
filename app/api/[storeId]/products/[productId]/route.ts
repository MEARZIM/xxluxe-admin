import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prismaDB";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        const body = await req.json();
        const {
            name,
            images,
            price,
            categoryId,
            sizeId,
            colorId,
            isFeatured,
            isArchived,
        } = body;


        if (!name) {
            return new NextResponse("Name is required.", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Image is required.", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Price is required.", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("CategoryId is required.", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("sizeId is required.", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("ColorId is required.", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }

        if (!params.productId) {
            return new NextResponse("productId Id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        await prismadb.product.update({
            where: {
                id: params.productId,
            },

            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images:{
                    deleteMany:{}
                },
                isFeatured,
                isArchived,
            }
        })

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },

            data: {
               images: {
                createMany:{
                    data: [
                        ...images.map((image: {url: string}) => image)
                    ]
                }
               }
            }
        })

        return NextResponse.json(product);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }

        if (!params.productId) {
            return new NextResponse("productId Id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            }
        });

        return NextResponse.json(product);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    _req: Request,
    { params }: { params: { productId: string } }
) {
    try {

        if (!params.productId) {
            return new NextResponse("productId Id is required", { status: 400 });
        }

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            },
        })

        return NextResponse.json(product);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}