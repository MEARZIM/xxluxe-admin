import React from 'react'
import { prismadb } from '@/lib/prismaDB';

import { OrderForm } from './components/order-form';

const DynamicOrderPage = async ({
    params
}: {
    params: {
        orderId: string;
    }
}) => {
    
    
    const order = await prismadb.order.findFirst({
        where: {
            id: params.orderId
        },
        include: {
            orderItem: {
                include: {
                    product: {
                        include:{
                            category: true,
                            size: true,
                            color: true
                        }
                    }
                },
            },
        },
    });


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <OrderForm initialData={order}/>
            </div>
        </div>
    )
}

export default DynamicOrderPage
