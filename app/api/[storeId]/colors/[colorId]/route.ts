import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prismaDB";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
        
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        const body = await req.json();
        const { name, value } = body;
        

        if (!name || !value) {
            return new NextResponse("Label and Image both are required.", {status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        if (!params.colorId) {
            return new NextResponse("colorId Id is required", {status: 400});
        }
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthenticated", {status: 403});
        }

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
               name,
               value,
            }
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
    
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        if (!params.colorId) {
            return new NextResponse("colorId Id is required", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthenticated", {status: 403});
        }

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId,
            }
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    _req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
    
        if (!params.colorId) {
            return new NextResponse("colorId Id is required", {status: 400});
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            }
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}