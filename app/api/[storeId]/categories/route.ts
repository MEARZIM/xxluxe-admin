import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prismaDB";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        // Have to Authenticate first
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("User is not authenticated", {status: 401});
        }

        const body = await req.json();
        const { name, billboardId } = body;
        
        if (!name || !billboardId) {
            return new NextResponse("Name and BillboardId both are required.", {status: 400});
        }
        
        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
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

        const category  = await prismadb.category.create({
            data: { 
                name,
                billboardId,
                storeId: params.storeId
            },
        })

        return NextResponse.json(category);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        const categories = await prismadb.category.findMany({
            where:{
                storeId: params.storeId
            }
        })

        return NextResponse.json(categories);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}