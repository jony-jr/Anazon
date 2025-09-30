'use server'
import { revalidatePath } from "next/cache";
import { metaProductType, productType } from "../_interfaces/products.type";

export async function getAllProducts(page:number=1 ): Promise<metaProductType | null> {
   try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=30&page=${page}`, { cache: "force-cache" });
      const finalRes = await res.json();
      // revalidatePath("/")
      return finalRes;
   } catch (error) {
      console.log(error);
      return null
   }
}
export async function getSpecificProduct(id: string): Promise<productType | null> {
   try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, { cache: "force-cache" });
      const finalRes = await res.json();
      return finalRes.data;
   } catch (error) {
      console.log(error);
      return null
   }
}