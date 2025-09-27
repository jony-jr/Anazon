'use server'
import { getAuthUserToken } from "@/utils/utils";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function addProductToWishlist(id: string): Promise<boolean> {
    const token: string = await getAuthUserToken()

    try {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: id }, {
            headers: { token }
        })
        console.log("🚀 ~ addProductToWishlist ~ res:", res.data)

        revalidatePath('/', "page");
        revalidatePath('/wishlist', "page");
        return true;
    } catch (error) {

        return false
    }

}

export async function deletItemFromWishlist(id: string): Promise<boolean> {
    const token: string = await getAuthUserToken()
    try {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: { token }
        })
        // console.log("🚀 ~ deletItemFromCart ~ res:", res.data)
        revalidatePath('/wishlist', "page");
        revalidatePath('/', "page");
        return true
    } catch (error) {
        // console.log("🚀 ~ deletItemFromCart ~ error:", error)
        return false
    }

}

