import NextAuth, { NextAuthOptions } from "next-auth"

import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from 'jwt-decode'
import GitHubProvider from 'next-auth/providers/github'; // Example provider

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Anazon',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async function (credentials) {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
          method: "post",
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })
        const finallRes = await res.json();
        // console.log("🚀 ~ postRegister ~ finallRes:", finallRes)
        if (finallRes.message == 'success') {

          const { role, ...userData } = finallRes.user
          const tkn: string = finallRes.token
          const { id }: { id: string } = jwtDecode(tkn)

          return { ...userData, tkn, id }
        } else {
          return null
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/not-found',
  },
  callbacks: {
    //after success login and each navigation
    jwt(params) {
      if (params.user) {
        params.token.userTKN = params.user.tkn 
      }
      return params.token;
    },

    //access session 1- use session 2- getSession() 3- /api/auth/sesion
    session(params) {
      params.session.user.id = params.token.sub
      // console.log('sessions params', params);
      return params.session
    },

  },
  session: {
    maxAge: 60 * 60 * 24
  },
  secret: process.env.NEXTAUTH_SECRET,
}