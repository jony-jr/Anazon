"use client";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OrangeBtn from "@/app/_Components/Btn/OrangeBtn";
import { loginSchema, loginType } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingLabelInput } from "@/components/ui/floatingLabelInput";
import Loader from "@/app/_Components/Loader/Loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Link, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const registerForm = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });
  const { control, handleSubmit } = registerForm;
  const router = useRouter();

  async function mySumbmit(data: loginType) {
    setIsLoading(true);

    // calling signIn function
    const outPut = await signIn("credentials", { ...data, redirect: false });

    // Show Toster and navigate user
    if (outPut?.ok) {
      setIsLoading(false);
      toast.success(`welcome back`, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      });
      location.replace('/')
    }
    else {
      setIsLoading(false);
      toast.error("Invalid email or password", {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
      });
    }
  }

  return (
    <>

      <section className="container w-3/4 xl:w-1/2 mx-auto ">
        <Form {...registerForm}>
          <form className="grid gap-4" onSubmit={handleSubmit(mySumbmit)}>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-0.5">
                  <FormControl>
                    <FloatingLabelInput
                      className="rounded-2xl text-sm -translate-y-full"
                      id="email"
                      label="Email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="ms-2" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="gap-0.5">
                  <FormControl>
                    <FloatingLabelInput
                      className="rounded-2xl text-sm -translate-y-full"
                      id="password"
                      label="password"
                      {...field}
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="ms-2" />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center p-2">
              {isLoading ? (
                <Loader className="scale-50 -translate-y-2 h-11" />
              ) : (
                <OrangeBtn name={"Login"} />
              )}
            </div>

          </form>
        </Form>
      </section>
    </>
  );
}
