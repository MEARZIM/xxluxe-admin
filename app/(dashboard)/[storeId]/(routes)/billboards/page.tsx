import React from 'react'
import { BillBoardClient } from './components/client'

const BillBoardsPage = () => {
    return (
        <>
            <section className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <BillBoardClient />
                </div>
            </section>
        </>
    )
}

export default BillBoardsPage
