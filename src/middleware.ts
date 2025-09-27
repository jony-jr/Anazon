import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const jwt = await getToken({
        req
    })
    // console.log("🚀 ~ middleware ~ jwt:", jwt)
    if(jwt){
        return NextResponse.next()
    }
  return NextResponse.redirect(`${process.env.MY_DOMAIN}/login`)
}
export const config ={
    matcher:['/cart:path*','/allorders']
}