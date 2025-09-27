import { authOptions } from "@/utils/auth"
import NextAuth from "next-auth"
import { NextRequest } from "next/server";


const handler = NextAuth(authOptions) as (req: NextRequest) => Promise<Response>;

export { handler as GET, handler as POST };