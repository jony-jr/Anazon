"use server"

import { registerType } from "./register.schema";
import axios from 'axios';
export async function postRegister(data: registerType) {
    // axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
    //     .then((res) => {
    //         console.log(res);
    //     }
    //     )
    //     .catch((rej) => {
    //         console.log("🚀 ~ postRegister ~ rej:", rej)
    //     })
    //     .finally()
    try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
        method:"post",
        body: JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
    })
    const finallRes = await res.json();
        // console.log("🚀 ~ postRegister ~ finallRes:", finallRes)
        if(finallRes.statusMsg === 'fail'){
            console.log("🚀 ~ postRegister ~ finallRes.message:", finallRes.message)
            return finallRes.message
        }else{
            return true
        }
        
    } catch (error) {
        console.log("🚀 ~ postRegister ~ error:", error)

    }
    
}
