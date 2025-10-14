'use server'

import { OrderAllDetailsType, OrderType } from "../_interfaces/allOrders.type";

export async function getAllOrders(): Promise<OrderAllDetailsType| null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/?limit=50&page=${1}`);
        const finalRes = await res.json();
        // console.log("🚀 ~ getUserOrders ~ finalRes:", finalRes)
        return finalRes;
    } catch (error) {
        console.log(error);
        return null
    }
}