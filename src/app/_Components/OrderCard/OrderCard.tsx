'use client'
import { OrderType } from '@/app/_interfaces/allOrders.type'
import React from 'react'
import imgLogo from '@images/icon.png'
import Image from 'next/image'
import ViewOrderDetailsBtn from '../Btn/ViewOrderDetailsBtn'

export default function OrderCard({ order }: { order: OrderType }) {
    return (
        <div
            className="relative grid grid-cols-12 gap-3  bg-white rounded-2xl px-5 py-5 pt-7"
        >

            {/* item image */}
            <figure className="relative col-span-3 md:col-span-2 max-h-30  xl:col-span-1 ">
                <Image
                    src={imgLogo}
                    fill
                    alt={'logo'}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    draggable={'false'}
                />
            </figure>
            {/* item Details */}
            <div className="md:flex  justify-between md:col-span-10 items-center col-span-9 xl:col-span-11">
                {/* Order number & Total price */}
                <div className="flex flex-col md:gap-2  ">
                    <p className="text-sm md:text-xl text-blue-950 font-semibold">
                        Order number: #ANAZON{order.id}
                    </p>
                    <p className="text-sm md:text-xl text-gray-600">
                        Order date: {order.createdAt.split("T", 1)}
                    </p>
                </div>
                {/* Oder date & View Detail Btn */}
                <div className="flex flex-col md:gap-3 justify-center md:items-end">
                    <p className="text-sm md:text-xl text-amber-600 font-bold md:font-extrabold">
                        Total: {order.totalOrderPrice}$
                    </p>
                    <ViewOrderDetailsBtn userOders={order} />
                </div>
            </div>
        </div>
    )
}
