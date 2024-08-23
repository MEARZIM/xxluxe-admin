import { prismadb } from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

export default async function SetUpLayout({
    children,
}: {
    children: React.ReactNode

}) {

    // Authenticate the user
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId
        }
    })

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )
}