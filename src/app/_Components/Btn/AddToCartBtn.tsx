"use client";
import React, { useContext, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import * as motion from "motion/react-client";
import { StringFormatParams } from "zod/v4/core";
import { addProductToCart } from "@/app/cart/cart.action";
import { toast } from "sonner";
import { getAuthUserToken } from "@/utils/utils";
import { cartContext } from "../Contexts/CartCountContext";
import { Button } from "@/components/ui/button";

export default function AddToCartBtn({
  isSingle = false,
  className,
  productId,
}: {
  isSingle?: boolean;
  className?: string;
  productId: string;
}) {
  const { updateCartCount } = useContext(cartContext)
  const [isLoading, setIsLoading] = useState(false)
  async function hadleAddToCart() {
    setIsLoading(true)
    console.log("added");
    const cartCount: number = await addProductToCart(productId);
    // console.log("🚀 ~ hadleAddToCart ~ cartCount:", cartCount)
    if (cartCount) {
      toast.success(`Product Added succesfully`, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      });
      updateCartCount(cartCount)
      setIsLoading(false)
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
      setIsLoading(false)
    }
  }
  return (
    <>
      <motion.div
        onClick={hadleAddToCart}
        whileTap={{ scale: 0.95 }}>
        <Button
          type="button"
          className={`${className}   text-xs py-1 flex gap-1 items-center justify-center px-2 md:px-5 cursor-pointer text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:none rounded-lg sm:text-sm lg:text-xl  text-center `}
          disabled={isLoading}
        >
          <GiShoppingCart />
          {isSingle && <span className="text-sm">Add to cart</span>}
        </Button>
      </motion.div>
    </>
  );
}
