import { prismadb } from "@/lib/prismaDB"


export const getTotalRevenue = async (storeId: string) => {
    const paidOrder = await prismadb.order.findMany({
        where: {
            storeId: storeId,
            isPaid: true
        },
        include: {
            orderItem: {
                include: {
                    product: true,
                }
            }
        }
    })

    const totalRevenue = paidOrder.reduce((total, order) =>{
        const orderTotal = order.orderItem.reduce((orderSum, item) => {
            return orderSum + item.product.price
        },0)

        return total + orderTotal;
    },0)

    return totalRevenue;
}