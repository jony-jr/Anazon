"use server"
import { getAuthUserToken } from "@/utils/utils";
import axios from "axios";
import { cartItemType } from "../_interfaces/products.type";

export async function getUserCart(): Promise<cartItemType | null> {
   const token = await getAuthUserToken()
   try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
         headers: { token },
         cache: "force-cache",
         // next:{tags:['cartCount']}
      });
      const finalRes:cartItemType = await res.json();
      // console.log("🚀 ~ getUserCart ~ finalRes:", finalRes)
      return finalRes;
      
      
   }
   catch (error) {
      console.log(error);
      return null
   }
}