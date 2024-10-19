import {
    CreditCard,
    IndianRupee,
    Package
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { formatter } from "@/lib/utils"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { getSalesCount } from "@/actions/get-total-sales-count"
import { getStockCount } from "@/actions/get-total-stock-count"
import Overview from "@/components/overview"
import { getGraphRevenue } from "@/actions/get-graph-revenue"

interface DashboardPageProps {
    params: {
        storeId: string
    }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphRevenue = await getGraphRevenue(params.storeId);

    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-x-4 p-8 pt-6">
                    <Heading
                        title="Dashboard"
                        description="Overview of the store"
                    />
                    <Separator className="m-2" />
                    <div className="grid gap-4 grid-cols-3 mt-4">
                        {/* Total Revenue */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-xl font-bold">
                                    Total Revenue
                                </CardTitle>
                                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatter.format(totalRevenue)}
                                </div>
                            </CardContent>
                        </Card>
                        {/* Total Sales */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-xl font-bold">
                                    Total Sales
                                </CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    +{salesCount}
                                </div>
                            </CardContent>
                        </Card>
                        {/* Products in Stock */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-xl font-bold">
                                    Products In Stock
                                </CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stockCount}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="my-4">
                        <CardHeader>
                            <CardTitle className="font-bold">
                                Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={graphRevenue}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;
