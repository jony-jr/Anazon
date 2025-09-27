"use server"
import { getAuthUserToken } from "@/utils/utils";
import { wishListType } from "../_interfaces/products.type";

export async function getUsetWishList(): Promise<wishListType | null> {
   const token = await getAuthUserToken()
   try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
         headers: { token },
         cache: "force-cache",
      });
      const finalRes: wishListType = await res.json();
      // console.log("🚀 ~ getUsetWishList ~ finalRes:", finalRes)
      return finalRes;


   }
   catch (error) {
      console.log(error);
      return null
   }
}