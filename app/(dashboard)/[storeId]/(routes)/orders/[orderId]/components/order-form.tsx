"use client"

import { 
    Category, 
    Color, 
    Order, 
    OrderItem, 
    Product, 
    Size 
} from "@prisma/client"

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"


interface OrderFormProps {
    initialData: Order & {
        orderItem: (OrderItem & {
            product: Product & {
                size: Size
                category: Category
                color: Color
            };
        })[];
    } | null;
}



export const OrderForm = ({ initialData }: OrderFormProps) => {

    const title = "Placed Order Details" 
    const description = "" 


    return (
        <>
            
            <div className="flex justify-between items-center">
                <Heading
                    title={title}
                    description={description}
                />
            </div>
            <Separator />



            {/* Order List */}

            <h3 className="text-lg font-bold">Order Items</h3>
            {initialData?.orderItem.length ? (
                <div className="grid gap-8 col-span-3 mt-4">
                    <ul className="space-y-4">
                        {initialData.orderItem.map((item) => (
                            <li
                                key={item.id}
                                className="p-4 border rounded-md shadow-sm cursor-pointer"
                            >
                                <p className="my-2"><strong>Product Name:</strong> {item.product.name}</p>
                                <p className="my-2"><strong>Product ID:</strong> {item.product.id}</p>
                                <p className="my-2"><strong>Quantity:</strong> {1}</p>
                                <p className="my-2"><strong>Price:</strong> ${item.product.price}</p>
                                <p className="my-2"><strong>Category ID:</strong> {item.product.category.name}</p>
                                <p className="my-2"><strong>Size ID:</strong> {item.product.size.name}</p>
                                <p className="my-2"><strong>Color ID:</strong> {item.product.color.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="col-span-3">
                    <p>No order items found.</p>
                </div>
            )}






            <Separator />


        </>
    )
}