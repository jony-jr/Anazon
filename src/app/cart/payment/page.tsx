"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { paymentType, pymentFormSchema } from "./paymentSchema"
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
import { Textarea } from "@/components/ui/textarea"
import { useContext, useEffect, useState } from "react"
import { getUserCart } from "@/app/_Services/cart.service"
import { createCashOrder, createCheckoutSession } from "./payment.action"
import { toast } from "sonner"
import { cartContext } from "@/app/_Components/Contexts/CartCountContext"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function payment() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const { updateCartCount } = useContext(cartContext)
    const [cartId, setCartId] = useState<string | null>(null)
    const paymentForm = useForm<paymentType>({
        resolver: zodResolver(pymentFormSchema),
        defaultValues: {
            phone: "",
            city: "",
            details: "",
            type: "cash",
        },
        mode: "onBlur",
    })
    const { control, handleSubmit } = paymentForm;
    async function getUserCartId() {
        const userCart = await getUserCart()
        setCartId(userCart?.cartId || '')
    }
    useEffect(function () {
        getUserCartId()
    }, [])

    async function handlePaymentFormSub(data: paymentType) {
        const { type, ...shippingAddress } = data
        // console.log("🚀 ~ handlePaymentFormSub ~ type:", type)
        setIsLoading(true)
        // console.log("🚀 ~ handlePaymentFormSub ~ shippingAddress:", shippingAddress)
        if (type === "cash") {
            console.log("🚀 ~ handlePaymentFormSub ~ caaaaaaaaash:", type)
            const isPayed = await createCashOrder(cartId, shippingAddress)
            if (isPayed) {
                setIsLoading(false)
                toast.success(`Order Created Succesfully`, {
                    style: {
                        "--normal-bg": "var(--background)",
                        "--normal-text":
                            "light-dark(var(--color-green-600), var(--color-green-400))",
                        "--normal-border":
                            "light-dark(var(--color-green-600), var(--color-green-400))",
                    } as React.CSSProperties,
                });
                updateCartCount(0);
                router?.replace('/cart')
            } else {
                setIsLoading(false)
                toast.error('error happend')
            }
        }
        else if (type === "visa") {
            // console.log("🚀 ~ handlePaymentFormSub ~ viiiiiiiisa:", type)
            const paymentURL:string = await createCheckoutSession(cartId, shippingAddress)
            if (paymentURL) {
                setIsLoading(false)
                window.location.replace(paymentURL)
            } else {
                setIsLoading(false)
                toast.error("Error happend")
            }
        }

    }

    return (
        <Form {...paymentForm}>
            <form onSubmit={handleSubmit(handlePaymentFormSub)} className="w-2/3 mx-auto space-y-6">
                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="Egyptian phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="city"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="details"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Details</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about details"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3 ">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue="cash"
                                    className="flex flex-col gap-4"
                                >
                                    <FormItem className="flex items-center gap-3  ">
                                        <FormControl>
                                            <RadioGroupItem value="cash" />
                                        </FormControl>
                                        <FormLabel className=" cursor-pointer font-bold ">
                                            Cash
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3  ">
                                        <FormControl>
                                            <RadioGroupItem value="visa" />
                                        </FormControl>
                                        <FormLabel className=" cursor-pointer font-bold ">
                                            Visa
                                        </FormLabel>
                                    </FormItem>

                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className={`${isLoading ? " cursor-not-allowed " : " cursor-pointer "}   `} type="submit" disabled={isLoading}>
                    Make Order
                </Button>
            </form>
        </Form>

    )
}


