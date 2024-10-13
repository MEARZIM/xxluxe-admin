import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prismaDB";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
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

        if (!params.sizeId) {
            return new NextResponse("sizeId Id is required", {status: 400});
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

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {
               name,
               value,
            }
        })

        return NextResponse.json(size);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
    
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        if (!params.sizeId) {
            return new NextResponse("sizeId Id is required", {status: 400});
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId,
            }
        })

        return NextResponse.json(size);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    _req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {

        if (!params.sizeId) {
            return new NextResponse("sizeId Id is required", {status: 400});
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            }
        })

        return NextResponse.json(size);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}