import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prismaDB";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        const body = await req.json();
        const { name } = body;
        console.log(name);

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 402 });
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
    
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 402 });
        }

        const store = await prismadb.store.delete({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}