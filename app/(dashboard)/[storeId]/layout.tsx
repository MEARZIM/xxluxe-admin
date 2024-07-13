import { redirect } from "next/navigation";

import { prismadb } from "@/lib/prismaDB"


export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { storeId: string }
}) {
    // Authenticate the user

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
            <div>
                there will be the navbar
            </div>
            {children}
        </>
    )
}