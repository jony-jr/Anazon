"use client"
import { deletItemFromCart } from "@/app/cart/cart.action";
import React, { useContext } from "react";
import { TbHttpDelete } from "react-icons/tb";
import { toast } from "sonner";
import { cartContext } from "../Contexts/CartCountContext";

export default function DeleteItemFromCartBtn({id}:{id:string}) {
    const { updateCartCount } = useContext(cartContext);
  
  async function handleDeleteItem() {
    const isRemoved =  await deletItemFromCart(id);
    console.log("🚀 ~ handleDeleteItem ~ isRemoved:", isRemoved)
    if(isRemoved){
        toast.success(`Item deleted succesfully`, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      });
            updateCartCount(isRemoved);
    }
  }
  return (
    <>
      <button
        onClick={handleDeleteItem}
        type="button"
        className="text-gray-800 absolute  right-5 top-3 hover:text-red-600 cursor-pointer"
      >
        <TbHttpDelete size={20} />
      </button>
    </>
  );
}
