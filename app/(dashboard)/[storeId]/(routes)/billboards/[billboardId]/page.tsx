import React from 'react'
import { prismadb } from '@/lib/prismaDB';

import { BillBoardForm } from './components/billboard-form';

const DynamicBillBoardPage = async ({
    params
}: {
    params: {
        billboardId: string;
    }
}) => {
    
    
    const billboard = await prismadb.billboard.findFirst({
        where: {
            id: params.billboardId
        }
    });


    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8'>
                <BillBoardForm initialData={billboard}/>
            </div>
        </div>
    )
}

export default DynamicBillBoardPage
