"use client";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import {  deletItemFromWishlist } from "../wishlist.action";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function DelHeartWish({
    className,
    productId,
}: {
    className?: string;
    productId: string;
}) {
    const [isLoading, setIsLoading] = useState(false)

    async function hadleDelFromCart() {
        setIsLoading(true)
        const isdeleted = await deletItemFromWishlist(productId)
        setIsLoading(false)

        if (isdeleted) {
            toast.success(``, {
                icon: <FaRegHeart className="text-red-400" size={15} />,
                style: { width: "auto", textAlign: "center", marginInline: "auto" }
                
            });
        } else {
            toast.error("Login First", {
                style: {
                    "--normal-bg": "var(--background)",
                    "--normal-text":
                        "light-dark(var(--color-red-600), var(--color-red-400))",
                    "--normal-border":
                        "light-dark(var(--color-red-600), var(--color-red-400))",
                } as React.CSSProperties,
            });
        }
    }
    return (
        <>
            <Button
                style={{ padding: 0, }}
                onClick={hadleDelFromCart}
                type="button"
                className={`${className} h-fit bg-transparent hover:bg-transparent flex  items-center justify-center   cursor-pointer text-gray-900  focus:ring-0 focus:outline-none focus:none rounded-lg   text-center `}
                disabled={isLoading}
            >
                <FaHeart size={30} color="red" className=" p-0 cursor-pointer " />
            </Button>
        </>
    )
}
