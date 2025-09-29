'use server'
import { getAuthUserToken } from "@/utils/utils";
import { OrderType } from "../_interfaces/allOrders.type";
import { jwtDecode } from "jwt-decode";

export async function getUserOrders(): Promise<OrderType[] | null> {
    const token = await getAuthUserToken()
    const { id }: { id: string } = jwtDecode(token)
    console.log("🚀 ~ getUserOrders ~ id:", id)
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
        const finalRes = await res.json();
        // console.log("🚀 ~ getUserOrders ~ finalRes:", finalRes)
        return finalRes;
    } catch (error) {
        console.log(error);
        return null
    }
}