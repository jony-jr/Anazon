import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAuthUserToken(): Promise<string> {
    const cookie = await cookies()
    const sessionToken =
        cookie.get('next-auth.session-token')?.value ||
        cookie.get('__Secure-next-auth.session-token')?.value
    const tkn = await decode({ token: sessionToken, secret: process.env.NEXTAUTH_SECRET || '' })
    // console.log("🚀 ~ getAuthUserToken ~ tkn:", tkn)
    const userToken: string | null = tkn?.userTKN
    return userToken;
}