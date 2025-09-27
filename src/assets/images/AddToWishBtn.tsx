"use client";
import React, { useContext, useState } from "react";
import * as motion from "motion/react-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addProductToWishlist, deletItemFromWishlist } from "../wishlist.action";
import { FaRegHeart } from "react-icons/fa";

export default function AddToWishBtn({
    className,
    productId,
}: {
    className?: string;
    productId: string;
}) {
    const [isLoading, setIsLoading] = useState(false)
    async function hadleAddToCart() {
        setIsLoading(true)
        const isAdded = await addProductToWishlist(productId)
        setIsLoading(false)

        if (isAdded) {
            toast.success(``, {
                icon: <FaRegHeart className="text-green-400" size={15} />,
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
            <motion.div
                className="bg-transparent "
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.1 }}>
                <Button
                    style={{ padding: 0, }}
                    onClick={hadleAddToCart}
                    type="button"
                    className={`${className} h-fit bg-transparent hover:bg-transparent flex  items-center justify-center   cursor-pointer text-gray-900  focus:ring-0 focus:outline-none focus:none rounded-lg   text-center `}
                    disabled={isLoading}
                >


                    <FaRegHeart
                        size={30}
                        className="text-black p-0 cursor-pointer hover:text-amber-600"
                    />



                </Button>
            </motion.div>
        </>
    );
}
