"use client"

import * as z from "zod";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "../ui/modal"
import { Button } from "@/components/ui/button"
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
import { useStoreModal } from "@/hooks/use-store-modal"
import toast from "react-hot-toast";



const formSchema = z.object({
    name: z.string().min(1, {
        message: "Store name must be at least 2 characters.",
    }),
})



export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },

    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values);
        try {
            setLoading(true);
            const res =  await axios.post('/api/stores', values)
            // console.log(res);
            toast.success("Store created successfully!");
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal
                title="Create Store"
                description="Add a new store"
                isOpen={storeModal.isOpen}
                onClose={storeModal.onClose}
            >
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enter Your Store Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display store name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-x-2 pt-6 flex items-center justify-end w-full">
                                    <Button
                                        variant="outline"
                                        onClick={storeModal.onClose}
                                        disabled={loading}
                                    >
                                        Cancel</Button>

                                    <Button type="submit" disabled={loading}>Continue</Button>
                                </div>
                            </form>
                        </Form>
                    </div>

                </div>
            </Modal>
        </>
    )
}


