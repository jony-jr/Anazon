"use client";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { deletItemFromWishlist } from "../wishlist.action";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { WishListContext } from "@/app/_Components/Contexts/WishListContext";

export default function DelHeartWish({ className, productId }: { className?: string; productId: string }) {
    const { wishListIdes, delWishesIdes } = useContext(WishListContext);
    const [isLoading, setIsLoading] = useState(false);

    async function handleDeleteFromWishlist() {
        setIsLoading(true);
        // Optimistic update
        delWishesIdes(productId);
        const isDeleted = await deletItemFromWishlist(productId);
        if (!isDeleted) {
            toast.error("Login First", {
                style: {
                    "--normal-bg": "var(--background)",
                    "--normal-text": "light-dark(var(--color-red-600), var(--color-red-400))",
                    "--normal-border": "light-dark(var(--color-red-600), var(--color-red-400))",
                } as React.CSSProperties,
            });
            // Revert on failure
            wishListIdes.push(productId);
        }
        setIsLoading(false);
    }

    return (
        <Button
            style={{ padding: 0 }}
            onClick={handleDeleteFromWishlist}
            type="button"
            className={`${className} h-fit bg-transparent hover:bg-transparent flex items-center justify-center cursor-pointer text-gray-900 focus:ring-0 focus:outline-none focus:none rounded-lg text-center`}
            disabled={isLoading}
        >
            <FaHeart size={30} color="red" className="p-0 cursor-pointer" />
        </Button>
    );
}