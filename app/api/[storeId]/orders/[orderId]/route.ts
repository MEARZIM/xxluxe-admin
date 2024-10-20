import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prismaDB";

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, orderId: string } }
) {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 401 });
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }

        if (!params.orderId) {
            return new NextResponse("orderId Id is required", { status: 400 });
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

        await prismadb.orderItem.deleteMany({
            where: {
                orderId: params.orderId,
            },
        });

        const order = await prismadb.order.delete({
            where: {
                id: params.orderId,
            },
        });

        return NextResponse.json(order);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}