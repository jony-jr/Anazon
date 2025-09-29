"use client"
import { CartItem, OrderType } from '@/app/_interfaces/allOrders.type'
import React from 'react'
import { X } from "lucide-react"
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import OrangeBtn from './OrangeBtn'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'

export default function ViewOrderDetailsBtn({ userOders }: { userOders: OrderType }) {
    const { id, shippingAddress, shippingPrice, taxPrice, totalOrderPrice, isPaid, user, paymentMethodType, cartItems } = userOders
    return (
        <div className="">
            <Dialog>
                <DialogTrigger asChild>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button variant={'default'} className={`flex items-center justify-center cursor-pointer shadow  py-2 rounded-3xl text-sm capitalize bg-gradient-to-b from-amber-500 to-amber-700 text-white `}
                        >
                            view details
                        </Button>
                    </motion.div>

                </DialogTrigger>
                <DialogContent className="mx-auto max-w-xs  sm:max-w-lg  lg:max-w-3xl xl:max-w-6xl" showCloseButton={true}>
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Order ID: #ANAZONE{id}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className=" h-[500] md:h-[700] lg:h-auto  mx-auto w-full rounded-md  sm:p-4">

                        <div className="pb-3 grid w-full lg:grid-cols-12 gap-3 mx-auto ">
                            {/* Shipping info */}
                            <Card className='border-primary gap-2 lg:col-span-6 xl:col-span-4   bg-transparent shadow-none'>
                                <CardHeader>
                                    <CardTitle className='border-b-1 pb-4 text-blue-950 select-none'>Shipping Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-gray-600 flex gap-1 flex-wrap'><span className='text-blue-950 font-semibold '>Name:</span> {user.name}</p>
                                    <p className='text-gray-600 flex gap-1  flex-wrap '><span className='text-blue-950 font-semibold  '>Email:</span> {user.email}</p>
                                    <p className='text-gray-600 flex gap-1  flex-wrap'><span className='text-blue-950 font-semibold '>Phone:</span> {shippingAddress.phone}</p>
                                    <p className='text-gray-600 flex gap-1  flex-wrap'><span className='text-blue-950 font-semibold '>City:</span> {shippingAddress.city}</p>

                                </CardContent>
                            </Card>
                            {/* Order Summary */}
                            <Card className='border-primary gap-2 lg:col-span-6 xl:col-span-4   bg-transparent shadow-none'>
                                <CardHeader>
                                    <CardTitle className='border-b-1 pb-4 text-blue-950 select-none'>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent >
                                    <p className='text-gray-600'><span className='text-blue-950 font-semibold '>Taxes:</span> ${taxPrice}</p>
                                    <p className='text-gray-600'><span className='text-blue-950 font-semibold '>Shipping Price:</span> ${shippingPrice}</p>
                                    <p className='text-gray-600'><span className='text-blue-950 font-semibold capitalize'>{paymentMethodType}:</span>{isPaid ? " paid" : ' not paid'}</p>
                                    <p className='text-blue-900 font-bold text-3xl pt-2 border-t-1 mt-1 select-none'> ${totalOrderPrice}.00</p>

                                </CardContent>
                            </Card>
                            {/* Order Summary */}
                            <Card className='border-primary gap-2 lg:col-span-12 xl:col-span-4   bg-transparent shadow-none'>
                                <CardHeader>
                                    <CardTitle className='border-b-1 pb-4 text-blue-950 select-none'>Order items</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className=" h-[100]  mx-auto w-full rounded-md  ">
                                        {cartItems?.map(({ _id, price, count, product }) => (
                                            <div key={_id} className=" flex flex-col gap-1  ">
                                                {/* products Card */}

                                                <div
                                                    key={_id}
                                                    className="relative grid grid-cols-12 gap-3  bg-white rounded-2xl p-4"
                                                >
                                                    {/* item image */}
                                                    <figure className="relative col-span-2 max-h-25  xl:col-span-3 ">
                                                        <Image
                                                            src={product.imageCover}
                                                            fill
                                                            alt={product.title}
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                            draggable={'false'}
                                                        />
                                                    </figure>
                                                    {/* item Details */}
                                                    <div className=" col-span-10 xl:col-span-9">
                                                        {/* items name & price */}
                                                        <div className="w-3/4 flex justify-between mb-1 ">

                                                            <p className=" text-sm line-clamp-1 text-blue-950 font-semibold">
                                                                {product.title}
                                                            </p>

                                                        </div>
                                                        <div className="flex items-center justify-between ">
                                                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                                {Array.from(
                                                                    { length: Math.floor(product.ratingsAverage) },
                                                                    (_, i) => (
                                                                        <FaStar key={i} size={13} className=" text-amber-400" />
                                                                    )
                                                                )}
                                                            </div>
                                                            <span className="bg-gray-50 me-auto text-amber-500 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                                                                {product.ratingsAverage}
                                                            </span>
                                                            {/* <AddToWishBtn productId={product._id} /> */}
                                                        </div>
                                                        {/* items counter */}
                                                        <div className="flex justify-between ">
                                                            <p className="text-amber-600 font-extrabold">
                                                                {price}$
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </ScrollArea>

                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    )
}
