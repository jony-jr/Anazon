"use client"
import { deletItemFromCart } from "@/app/cart/cart.action";
import React, { useContext, useState } from "react";
import { TbHttpDelete } from "react-icons/tb";
import { toast } from "sonner";
import { deletItemFromWishlist } from "../wishlist.action";
import { WishListContext } from "@/app/_Components/Contexts/WishListContext";

export default function DeleteFromWishBtn({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { wishListIdes, delWishesIdes } = useContext(WishListContext);

  async function handleDeleteItem() {
    setIsLoading(true);
    // Optimistic update
    delWishesIdes(id);
    const isDeleted = await deletItemFromWishlist(id);
    if (!isDeleted) {
      toast.error("Login First", {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text": "light-dark(var(--color-red-600), var(--color-red-400))",
          "--normal-border": "light-dark(var(--color-red-600), var(--color-red-400))",
        } as React.CSSProperties,
      });
      // Revert on failure
      wishListIdes.push(id);
    } else {
      toast.success(`Wish deleted succesfully`, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      })
    }
    setIsLoading(false);
  }
  return (
    <>
      <button
        onClick={handleDeleteItem}
        type="button"
        className="text-gray-800 absolute  right-5 top-3 hover:text-red-600 cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <TbHttpDelete size={20} />
      </button>
    </>
  );
}
