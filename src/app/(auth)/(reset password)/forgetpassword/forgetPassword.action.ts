"use server"

import axios from "axios"

export async function forgotPasswords(email: string) {
    try {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email })
        console.log("🚀 ~ deletItemFromCart ~ res:", res.data)
        return res.data.message;
    } catch (error) {
        // console.log("🚀 ~ deletItemFromCart ~ error:", error)
        return false
    }

}

// //////////////////////////

export async function verifyResetCode(resetCode: string) {
    try {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, { "resetCode":resetCode })
        console.log("🚀 ~ verifyResetCode ~  res.data:", res.data)
        return true;
    } catch (error) {
        console.log("🚀 ~ verifyResetCode ~ error:", error)
        return false
    }

}

// ////////////////////////////

export async function resetPasswowrd(newData:{email:string , newPassword:string}) {
    try {
        const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, { ...newData })
        // console.log("🚀 ~ resetPasswowrd ~ newData:", newData)
        console.log("🚀 ~ verifyResetCode ~  res.data:", res.data)
        return true;
    } catch (error) {
        console.log("🚀 ~ verifyResetCode ~ error:", error)
        return false
    }

}