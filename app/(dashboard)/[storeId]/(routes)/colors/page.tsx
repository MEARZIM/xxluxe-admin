import React from 'react'
import { format } from 'date-fns';

import { prismadb } from '@/lib/prismaDB'
import { ColorsClient } from './components/client'
import { ColorColumn } from './components/columns'

const BillBoardsPage = async ({
    params
} : {
    params:{
        storeId: string,
    }
}) => {

    const colors = await prismadb.color.findMany({
        where:{
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedcolors : ColorColumn[]  = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do yyyy") 
    }))

    return (
        <>
            <section className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <ColorsClient data={formattedcolors}/>
                </div>
            </section>
        </>
    )
}

export default BillBoardsPage
