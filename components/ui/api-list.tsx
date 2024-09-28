"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

export const ApiList = ({
    entityName,
    entityIdName
}: ApiListProps) => {
    const parmas = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${parmas.storeId}`;

    return (
        <>
            <ApiAlert
                title={"GET"}
                description={`${baseUrl}/${entityIdName}`}
                variant={"public"}
            />

            <ApiAlert
                title={"GET"}
                description={`${baseUrl}/${entityIdName}/{${entityIdName}}`}
                variant={"public"}
            />

            <ApiAlert
                title={"POST"}
                description={`${baseUrl}/${entityIdName}`}
                variant={"admin"}
            />

            <ApiAlert
                title={"PATCH"}
                description={`${baseUrl}/${entityIdName}/{${entityIdName}}`}
                variant={"admin"}
            />

            <ApiAlert
                title={"DELETE"}
                description={`${baseUrl}/${entityIdName}/{${entityIdName}}`}
                variant={"admin"}
            />
        </>
    )
}