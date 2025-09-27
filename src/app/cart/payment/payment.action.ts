'use server'
import { getAuthUserToken } from "@/utils/utils";
import axios from "axios";
import { paymentType } from "./paymentSchema";
import { revalidatePath } from "next/cache";
import { shippingAddressType } from "@/app/_interfaces/products.type";

export async function createCashOrder(cartId: string | null, shippingAddress: shippingAddressType): Promise<boolean> {
    const token: string = await getAuthUserToken()

    try {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress }, {
            headers: { token }
        })
        console.log("🚀 ~ createCashOrder ~ res:", res.data)
        revalidatePath('/cart');
        return true;
    } catch (error) {

        return false
    }

}

export async function createCheckoutSession(cartId: string | null, shippingAddress: shippingAddressType): Promise<string |boolean> {
    const token: string = await getAuthUserToken()
    try {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, { shippingAddress }, {
            headers: { token },
            params: { url: process.env.MY_DOMAIN }
        })
        console.log("🚀 ~ createCheckoutSession ~ res:", res.data)
        if(res.data.status ==="success"){
            const paymentWayURL = res.data.session.url
            return paymentWayURL;
        }
    } catch (error) {
        return false
    }

}

type successSessionType = {
    url: string,
    success_url: string,
    cancel_url: string,
}

// data: {
//     status: 'success',
//     session: {
//       url: 'https://checkout.stripe.com/c/pay/cs_test_a1jHRhHwH1kwyIrVsgWvkswQ1OFcBV1EtKM2JV06hQYKPfsVlmWVB2Vv1s#fidkdWxOYHwnPyd1blpxYHZxWjA0SHViYl1ANVYyU2pOX2hVVW9ASmZBUElpa2FLVnBUQGo2UFduUEhIXHx9aEhjanBGZ1NxZ3RKNVVtXWxcSTJ8Qzx2aWZkUEBpMXJCXVRHTkIxZzBSZmhENTUxYHVKMUpQVycpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl',
//       success_url: 'http://localhost:3000/allorders',
//       cancel_url: 'http://localhost:3000/cart'
//     }
//   }