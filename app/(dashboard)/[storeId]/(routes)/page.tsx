import { prismadb } from "@/lib/prismaDB"

interface DashboardPageProps {
    params: {
        storeId: string
    }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return (
        <>
            Active Store: {store?.name} 
            this will be the Dashboard page
        </>
    )
}

export default DashboardPage;
