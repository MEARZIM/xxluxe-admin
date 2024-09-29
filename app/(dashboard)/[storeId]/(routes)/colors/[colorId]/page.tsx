import React from 'react'
import { prismadb } from '@/lib/prismaDB';

import { ColorForm } from './components/color-form';

const DynamicBillBoardPage = async ({
    params
}: {
    params: {
        colorId: string;
    }
}) => {
    
    
    const color = await prismadb.color.findFirst({
        where: {
            id: params.colorId
        }
    });


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <ColorForm initialData={color}/>
            </div>
        </div>
    )
}

export default DynamicBillBoardPage
