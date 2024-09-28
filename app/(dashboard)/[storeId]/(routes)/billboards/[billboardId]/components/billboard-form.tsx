"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react"
import { Billboard } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import AlertModal from "@/components/modals/alert-modal";
import { useOrigin } from "@/hooks/use-origin";
import { ImageUpload } from "@/components/ui/image-upload";

interface BillBoardFormProps {
    initialData: Billboard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
})

type BillBoardFormValues = z.infer<typeof formSchema>

export const BillBoardForm = ({ initialData }: BillBoardFormProps) => {
    const parmas = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit BillBoard" : "Create BillBoard";
    const description = initialData ? "Edit a BillBoard" : "Add a new BillBoard";
    const toastMsg = initialData ? "BillBoard updated." : "BillBoard created.";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<BillBoardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    const onSubmit = async (data: BillBoardFormValues) => {
        try {

            setLoading(true);
            if(initialData) {
                await axios.patch(`/api/${parmas.storeId}/billboards/${parmas.billboardId}`, data);
            } else {
                await axios.post(`/api/${parmas.storeId}/billboards`, data);
            }
            router.refresh();
            router.push(`/${parmas.storeId}/billboards/`);
            toast.success(toastMsg);

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
       
    }

    const onDelete = async () => {
        try {

            setLoading(true);
            await axios.delete(`/api/${parmas.storeId}/billboards/${parmas.billboardId}`);
            router.push("/");
            toast.success("Billboard Deleted.");

        } catch (error) {
            toast.error("Make sure you remove all categories using this billboard first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex justify-between items-center">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => { setOpen(true) }}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Add Billboard Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display BillBoard Image.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="BillBoard Label" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display BillBoard Label.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="ml-auto"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />


        </>
    )
}