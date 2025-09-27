"use client";
import { toast } from "sonner";
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
import { RegisterSchema, registerType } from "./register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingLabelInput } from "@/components/ui/floatingLabelInput";
import { postRegister } from "./register.action";
import Loader from "@/app/_Components/Loader/Loader";
import SoftDestructiveSonnerDemo from "@/app/_Components/Sonners/SoftDestructiveSonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const [isLoading, setIsLoading] = useState(false);
  const registerForm = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
  });
  const { control, handleSubmit } = registerForm;
  const router = useRouter()
  async function mySumbmit(data: registerType) {
    setIsLoading(true);
    // Callling API
    const ouPut = await postRegister(data);
    // Show Toster and navigate user
    if (ouPut === true) {
      toast.success(`created Succesfully`, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      });
      setIsLoading(false);
      router.push('/login')
    } else {
      toast.error(ouPut, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
      });
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="w-1/2 mx-auto"></div>

      <section className="container w-3/4 xl:w-1/2 mx-auto ">
        <Form {...registerForm}>
          <form className="grid gap-4" onSubmit={handleSubmit(mySumbmit)}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => {
                const { ref, ...rest } = field;
                return (
                  <FormItem className="gap-0.5">
                    {/* <FormControl> */}
                    <div className="relative">
                      <FloatingLabelInput
                        className="rounded-2xl text-sm -translate-y-full"
                        id="name"
                        label="User name"
                        {...rest}
                        type="text"
                      />
                    </div>
                    {/* <FormDescription /> */}
                    <FormMessage className="ms-2" />
                  </FormItem>
                )
              }}
            />

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
              name="phone"
              render={({ field }) => (
                <FormItem className="gap-0.5">
                  <FormControl>
                    <FloatingLabelInput
                      className="rounded-2xl text-sm -translate-y-full"
                      id="phone"
                      label="phone"
                      {...field}
                      type="tel"
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
            <FormField
              control={control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="gap-0.5">
                  <FormControl>
                    <FloatingLabelInput
                      className="rounded-2xl text-sm -translate-y-full"
                      id="rePassword"
                      label="Confirm Password"
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
              <div className="flex justify-center items-center p-2">
                {isLoading ? (
                  <Loader className="scale-50 -translate-y-3 h-11" />
                ) : (
                  <OrangeBtn name={"Register"} />
                )}
              </div>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
