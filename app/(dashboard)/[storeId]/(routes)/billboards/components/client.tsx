"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const BillBoardClient = () => {
    const parmas = useParams();
    const router = useRouter();
    
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Billboards"
                    description="Manage billboards for your store"
                />
                <Button onClick={()=> router.push(`/${parmas.storeId}/billboards/new`)}>
                    <Plus className="w-4 h-4 mr-2"/>
                    Add New
                </Button>
            </div>

            <Separator />
        </>
    )
}