"use client"

import { useState } from "react"
import { Store } from "@prisma/client"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { useStoreModal } from "@/hooks/use-store-modal"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CommandSeparator } from "cmdk"

type PropoverTriggerProps = React.ComponentPropsWithoutRef<typeof Popover>

interface StoreSwitcherProps extends PropoverTriggerProps {
    className?: string
    items: Store[];
}

const StoreSwitcher = ({
    className,
    items = [],
}: StoreSwitcherProps) => {


    const params = useParams();
    const router = useRouter();
    const storeModal = useStoreModal();
    const [open, setOpen] = useState<boolean>(false);


    const formattedItems = items.map(item => (
        {
            label: item.name,
            value: item.id
        }
    ));

    const currentStore = formattedItems.find(item => item.value === params.storeId);

    const onStoreSelect = (store: {
        value: string,
        label: string
    }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            {/* PopOver content */}
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Store..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {
                                formattedItems.map((store) => (
                                    <CommandItem
                                        key={store.value}
                                        onSelect={() => onStoreSelect(store)}
                                        className="text-sm"
                                    >
                                        <StoreIcon className="mr-2 h-4 w-4" />
                                        {store.label}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentStore?.value === store.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />

                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandGroup>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                storeModal.onOpen();
                            }}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Store
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher
