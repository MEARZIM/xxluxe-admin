import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prismaDB";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        const body = await req.json();
        const { label, imageUrl } = body;
        

        if (!label || !imageUrl) {
            return new NextResponse("Label and Image both are required.", {status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        if (!params.billboardId) {
            return new NextResponse("BillboardId Id is required", {status: 400});
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
    
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        if (!params.billboardId) {
            return new NextResponse("BillboardId Id is required", {status: 400});
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(
    _req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {

        if (!params.billboardId) {
            return new NextResponse("BillboardId Id is required", {status: 400});
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}