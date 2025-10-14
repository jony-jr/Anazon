"use client"
import React, { useState } from "react";
import { Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { FloatingLabelInput } from "@/components/ui/floatingLabelInput"
import { useRouter } from 'next/navigation'
import { adminSchema, adminType } from "./admin.schema";
import { toast } from "sonner";
import { OrderType } from "../_interfaces/allOrders.type";
import { getAllOrders } from "../_Services/allOrders.service";
import OrderCard from "../_Components/OrderCard/OrderCard";
import Loader from "../_Components/Loader/Loader";



export default function Admin() {
    const [isLoading, setIsLoading] = useState(false);
    const [closeModale, setCloseModale] = useState(true);
    const [allOrders, setallOrders] = useState<null | OrderType[]>(null)
    const [numberOfOrders, setNumberOfOrders] = useState(0)
    const registerForm = useForm({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            user: "",
            password: "",
        },
    })

    const { control, handleSubmit } = registerForm;

    async function mySumbmit(data: adminType) {
        console.log("🚀 ~ mySumbmit ~ data:", data)
        if (data.user === "admin" && data.password === "Jr28100") {
            setIsLoading(true);
            toast.success(`Welcome back`, {
                style: {
                    "--normal-bg": "var(--background)",
                    "--normal-text":
                        "light-dark(var(--color-green-600), var(--color-green-400))",
                    "--normal-border":
                        "light-dark(var(--color-green-600), var(--color-green-400))",
                } as React.CSSProperties,
            });
            setCloseModale(false)
            const allOrdersData = await getAllOrders()
            setIsLoading(false);
            setallOrders(allOrdersData?.data!)
            setNumberOfOrders(allOrdersData?.results!)
        } else {
            toast.error('Invalide Admin')
        }

    }

    return (
        <section className="bg-gray-200 -mt-7 pt-5 pb-5">
            <Dialog onOpenChange={setCloseModale} open={closeModale} >
                <DialogOverlay className="bg-linear-to-r/longer from-indigo-500 to-teal-400" >
                    <DialogContent className="sm:max-w-md" showCloseButton={false} onInteractOutside={(e) => { e.preventDefault(); }}>
                        <DialogHeader>
                            <DialogTitle className="text-center">Admin</DialogTitle>
                        </DialogHeader>
                        <Form {...registerForm}>
                            <form className="grid gap-4" onSubmit={handleSubmit(mySumbmit)}>
                                <FormField
                                    control={control}
                                    name="user"
                                    render={({ field }) => (
                                        <FormItem className="gap-0.5">
                                            <FormControl>
                                                <FloatingLabelInput
                                                    className="rounded-2xl text-sm -translate-y-full"
                                                    id="user"
                                                    label="user"
                                                    {...field}
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage className="ms-2" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="gap-0.5">
                                            <FormControl>
                                                <FloatingLabelInput
                                                    className="rounded-2xl text-sm -translate-y-full"
                                                    id="password"
                                                    label="password"
                                                    {...field}
                                                    type="password"
                                                    autoComplete="new-password"
                                                />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage className="ms-2" />
                                        </FormItem>
                                    )}
                                />
                                <Button className="cursor-pointer" type="submit"> {'Submet'}</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </DialogOverlay>
            </Dialog>
            {isLoading &&
                <div className="h-screen flex justify-center items-center">
                    <Loader />
                </div>
            }
            {allOrders &&
                <div className="container mx-auto px-5 md:px-10 ">
                    <h1
                        className={`text-blue-950 select-none text-center text-4xl capitalize md:text-6xl mt-3 font-extrabold`}
                    >
                        All Orders
                    </h1>
                    <div className="grid  gap-4 ">
                        <div className=" flex flex-col gap-3  ">
                            <div className="flex flex-col md:flex-row justify-end md:items-center px-3">

                                <p className=" text-gray-400 ">
                                    number of orders: {numberOfOrders}
                                </p>
                            </div>
                            {/* products Card */}
                            {allOrders?.map(order => (

                                <OrderCard key={order._id} order={order} />

                            ))}
                        </div>

                    </div>
                </div>
            }
        </section>
    )
}
