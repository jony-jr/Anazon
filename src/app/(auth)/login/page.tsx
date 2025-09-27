import React from "react";
import { josefinSans } from "@/app/layout";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function login() {
  return (
    <main className="flex justify-center  flex-col items-center gap-3 mt-50">
      <h1 className={`${josefinSans.className} font-extrabold text-blue-950 text-4xl md:text-7xl  select-none`}>Login</h1>
      <LoginForm />
      <Link href={'/forgetpassword'} className="text-amber-600 cursor-pointer hover:underline" >Forgotten password?</Link>
    </main>
  );
}
