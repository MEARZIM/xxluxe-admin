import { prismadb } from "@/lib/prismaDB"


export const getStockCount = async (storeId: string) => {
    const stockCount = await prismadb.product.count({
        where: {
            storeId: storeId,
            isArchived: false
        }
    })

    return stockCount;
}