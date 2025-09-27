'use server'
import { getAuthUserToken } from "@/utils/utils";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function addProductToCart(id: string): Promise<boolean | number> {
    const token: string = await getAuthUserToken()
    //    try {
    //      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{

    //         // headers:{token: }
    //         body:{
    //             productId : id
    //         },
    //         cache:"force-cache"});
    //     const finalRes = await res.json();
    //     console.log("🚀 ~ addProductToCart ~ finalRes:", finalRes)
    //     return true;
    //    } catch (error) {
    //     console.log(error);
    //     return null
    //    }
    try {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id }, {
            headers: { token }
        })
        // console.log("🚀 ~ addProductToCart ~ res:", res)
        // console.log("cart.action ~ resss:", res)
        //     data: {
        // status: 'success',
        // message: 'Product added successfully to your cart',
        // numOfCartItems: 8,
        // cartId: '68cc5cf69df4589438054662',
        // data: {
        //   _id: '68cc5cf69df4589438054662',
        //   cartOwner: '68c2af96fdc93b3970617305',
        //   products: [Array],
        //   createdAt: '2025-09-18T19:26:46.265Z',
        //   updatedAt: '2025-09-19T14:47:35.519Z',
        //   __v: 7,
        //   totalCartPrice: 14865
        // }
        revalidatePath('/cart');
        // console.log("🚀 ~ addProductToCart ~ res.data.numOfCartItems:", res.data.numOfCartItems)
        return res.data.numOfCartItems as number;
    } catch (error) {

        return false
    }

}

export async function deletItemFromCart(id: string) {
    const token: string = await getAuthUserToken()
    try {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: { token }
        })
        // console.log("🚀 ~ deletItemFromCart ~ res:", res.data)
        revalidatePath('/cart');
        return res.data.numOfCartItems
    } catch (error) {
        // console.log("🚀 ~ deletItemFromCart ~ error:", error)
        return false
    }

}
export async function deleteAllItems() {
    const token: string = await getAuthUserToken()
    try {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: { token }
        })
        // console.log("🚀 ~ deleteAllItems ~ res:", res)
        revalidatePath('/cart');
        return true
    } catch (error) {
        console.log("🚀 ~ deleteAllItems ~ error:", error)
        return false
    }

}

export async function changeCartCountPerItem(id: string,count:number) {
    const token: string = await getAuthUserToken()
    try {
        const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count}, {
            headers: { token }
        })
        // console.log("🚀 ~ changeCartCountPerItem ~ res:", res.data)
        revalidatePath('/cart');
        return res.data.numOfCartItems
    } catch (error) {
        console.log("🚀 ~ deletItemFromCart ~ error:", error)
        return false
    }

}