import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prismaDB";

export async function POST(
    req: Request,
) {
    try {
        // Have to Authenticate first
        const userId = "12345"

        const body = await req.json();
        const { name } = body;
        console.log(name);

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        const store  = await prismadb.store.create({
            data: { 
                name: name, 
                userId: userId 
            },
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}