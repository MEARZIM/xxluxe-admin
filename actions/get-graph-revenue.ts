import { prismadb } from "@/lib/prismaDB"


interface GraphData {
    name: string;
    total: number;
}

export const getGraphRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
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

    const monthlyRevenue: {[key: number]: number} = {};

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;

        for (const item of order.orderItem) {
            revenueForOrder += item.product.price
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData: GraphData[] = [
        {name: 'jan', total: 0},
        {name: 'feb', total: 0},
        {name: 'mar', total: 0},
        {name: 'apr', total: 0},
        {name: 'may', total: 0},
        {name: 'jun', total: 0},
        {name: 'jul', total: 0},
        {name: 'aug', total: 0},
        {name: 'sep', total: 0},
        {name: 'oct', total: 0},
        {name: 'nov', total: 0},
        {name: 'dec', total: 0},
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
}