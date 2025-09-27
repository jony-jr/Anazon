"use client";
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
import { ForgetPasswordSchema, forgetPasswordType } from "./forgetpassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingLabelInput } from "@/components/ui/floatingLabelInput";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { forgotPasswords } from "./forgetPassword.action";
import VerifyCodeModal from "../_verifycode/VerfyCodeModal";

export default function ForgetPasswordForm() {
  const [isVerfyCodeModalOpen, setIsVerfyCodeModalOpen] = useState(false); // State to control modal
  const [isLoading, setIsLoading] = useState(false);
  const registerForm = useForm({
    resolver: zodResolver(ForgetPasswordSchema),
    mode: "onBlur",
  });
  const { control, handleSubmit } = registerForm;
  const router = useRouter();
  async function mySumbmit(data: forgetPasswordType) {
    setIsLoading(true);
    const ouPut = await forgotPasswords(data.email);
    if (ouPut) {
      toast.success(ouPut, {
        style: {
          "--normal-bg": "var(--background)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      });
      setIsLoading(false);
      setIsVerfyCodeModalOpen(true); // Open the modal on success
    } else {
      toast.error("error happend pleas try again", {
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
            <Button className="text-xl w-1/3 mx-auto " disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "submet"}
            </Button>
          </form>
        </Form>
        <VerifyCodeModal open={isVerfyCodeModalOpen} onOpenChange={setIsVerfyCodeModalOpen} />
      </section>
    </>
  );
}
