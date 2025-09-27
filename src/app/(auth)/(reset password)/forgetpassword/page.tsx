import React from "react";
import { josefinSans } from "@/app/layout";
import ForgetPasswordForm from "./forgetPasswordForm";

export default function login() {
  return (
    <main className="flex justify-center  flex-col items-center gap-3 mt-50">
      <h1
        className={`-space-x-1.5 md:space-x-0 flex items-center text-blue-950 text-4xl select-none`}
      >
        enter your email
      </h1>
      <ForgetPasswordForm />
    </main>
  );
}
