'use server'

import { metaBrandType, productType } from "../_interfaces/products.type";

export async function getAllBrands(page: number = 1): Promise<metaBrandType | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?limit=30&page=${page}`, { cache: "force-cache" });
        const finalRes = await res.json();
        console.log("🚀 ~ getAllBrands ~ finalRes:", finalRes)
        return finalRes;
    } catch (error) {
        console.log(error);
        return null
    }
}
export async function getBrandProducts(id: string): Promise<productType[] | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=50&brand=${id}`, { cache: "force-cache" });
        const finalRes = await res.json();
        console.log("🚀 ~ getBrandProducts ~ finalRes.data:", finalRes.data)
        return finalRes.data;
    } catch (error) {
        console.log(error);
        return null
    }
}