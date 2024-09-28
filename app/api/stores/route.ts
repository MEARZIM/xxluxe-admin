import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prismadb } from "@/lib/prismaDB";

export async function POST(
    req: Request,
) {
    try {
        // Have to Authenticate first
        const { userId } = auth();

        const body = await req.json();
        const { name } = body;

        if (!userId) {
            return new NextResponse("User is not authenticated", {status: 400});
        }


        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        const store  = await prismadb.store.create({
            data: { 
                name: name, 
                userId: userId as string
            },
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}