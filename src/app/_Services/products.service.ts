import { productType } from "../_interfaces/products.type";

export async function getAllProducts(): Promise<productType[] | null> {
   try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/products', { cache: "force-cache" });
      const finalRes = await res.json();
      return finalRes.data;
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