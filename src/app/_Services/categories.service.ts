import { categoryType } from "../_interfaces/products.type";

export async function getAllCategories ():Promise<categoryType[]|null>{
   try {
     const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{cache:"force-cache"});
    const finalRes = await res.json();
    return finalRes.data;
   } catch (error) {
    console.log(error);
    return null
   }
}

export async function getSpecificCategory (id:string):Promise<categoryType|null>{
   try {
     const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`,{cache:"force-cache"});
    const finalRes = await res.json();
    return finalRes.data;
   } catch (error) {
    console.log(error);
    return null
   }
}