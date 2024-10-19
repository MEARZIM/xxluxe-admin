import React from 'react'
import { redirect } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import { prismadb } from '@/lib/prismaDB'
import MainNav from '@/components/main-nav'
import StoreSwitcher from '@/components/ui/store-switcher'
import { ModeToggle } from './theme-toggle'

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findMany({
        where: {
            userId: userId
        }
    })

    return (
        <div className='border-b '>
            <div className='flex h-16 items-center px-4 gap-4'>
                <StoreSwitcher items={store}/>
                <MainNav />
                <div className='ml-auto flex items-center space-x-4' >
                    <ModeToggle />
                    <UserButton afterSwitchSessionUrl='/' />
                </div>
            </div>
        </div>
    )
}

export default Navbar
