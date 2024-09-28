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

        const body = await req.json();
        const { label, imageUrl } = body;
        
        if (!userId) {
            return new NextResponse("User is not authenticated", {status: 401});
        }


        if (!label || !imageUrl) {
            return new NextResponse("Label and Image both are required.", {status: 400});
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

        const billboard  = await prismadb.billboard.create({
            data: { 
                label,
                imageUrl,
                storeId: params.storeId
            },
        })

        return NextResponse.json(billboard);

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
        // Have to Authenticate first
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("User is not authenticated", {status: 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400});
        }

        const billboards = await prismadb.billboard.findMany({
            where:{
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}