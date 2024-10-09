import React from 'react'
import { format } from 'date-fns';

import { prismadb } from '@/lib/prismaDB'
import { OrderClient } from './components/client'
import { OrderColumn } from './components/columns'
import { formatter } from '@/lib/utils';

const OrderPage = async ({
    params
} : {
    params:{
        storeId: string,
    }
}) => {

    const orders = await prismadb.order.findMany({
        where:{
            storeId: params.storeId,
        },
        include: {
            orderItem: {
                include: {
                    product: true
                },
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders : OrderColumn[]  = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products: item.orderItem.map((order) => order.product.name).join(', '),
        totalPrice: formatter.format(item.orderItem.reduce((total, item) => {
            return total + Number(item.product.price);
        }, 0)),
        createdAt: format(item.createdAt, "MMMM do yyyy") 
    }))

    return (
        <>
            <section className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <OrderClient data={formattedOrders}/>
                </div>
            </section>
        </>
    )
}

export default OrderPage
