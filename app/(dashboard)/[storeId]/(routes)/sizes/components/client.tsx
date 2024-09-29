"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface SizesClientProps {
    data: SizeColumn[]
}

export const SizesClient = ({
    data
}: SizesClientProps) => {
    const parmas = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage Sizes for your store"
                />
                <Button onClick={() => router.push(`/${parmas.storeId}/sizes/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />


            <Heading
                title={"API"}
                description={"API calls for sizes."}
            />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId"/>
        </>
    )
}