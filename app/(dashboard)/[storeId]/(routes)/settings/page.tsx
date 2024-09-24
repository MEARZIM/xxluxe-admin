import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { prismadb } from '@/lib/prismaDB';
import { SettingsForm } from './components/settings-form';

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage = async ({
    params
}: SettingsPageProps) => {

    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <section className='flex-col'>
                <div className='flex-1 space-y-4 p-8 pt-6'>
                    <SettingsForm initialData={store}/>
                </div>
            </section>
        </>
    )
}

export default SettingsPage
