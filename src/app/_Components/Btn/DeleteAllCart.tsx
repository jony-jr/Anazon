"use client";
import { deleteAllItems } from "@/app/cart/cart.action";
import React, { useContext, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "sonner";
import { cartContext } from "../Contexts/CartCountContext";
import { Button } from "@/components/ui/button";

export default function DeleteAllCartBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const { updateCartCount } = useContext(cartContext);

  async function handleRemoveCartItems() {
    setIsLoading(true)
    const isDeleted = await deleteAllItems();
    setIsLoading(false)
    if (isDeleted) {
      toast.success(`Cart deleted succesfully`, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      });
      updateCartCount(0);
    }
  }
  return (
    <>
      <div className="group w-fit">
        <Button
          onClick={handleRemoveCartItems}
          className="bg-transparent  hover:bg-transparent  cursor-pointer transition-all  text-red-500 font-bold py-2 px-4 rounded   duration-200"
          disabled={isLoading}
        >
          {/* <!-- Default text --> */}
          <span className="inline-block group-hover:hidden ">
            <MdDeleteSweep />
          </span>

          {/* <!-- Hover text --> */}
          <span className="  hidden group-hover:inline-block">
            Delete all cart
          </span>
        </Button>
      </div>
    </>
  );
}
