"use client"
import React, { useState } from "react";
import { Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { verifyResetCode } from "../forgetpassword/forgetPassword.action"
import { toast } from "sonner"
import ResetPasswordModal from "../_resetPassword/ResetPasswordModal";
interface VerifyCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function VerifyCodeModal({ open, onOpenChange }: VerifyCodeModalProps) {
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false); // State to control modal
  
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const resetCode = data.pin
    console.log("🚀 ~ onSubmit ~ resetCode:", resetCode)
    const code = await verifyResetCode(resetCode)
    setIsLoading(false);
    if(code){
      onOpenChange(false)
      setIsResetPasswordModalOpen(true)
    }else{
      toast.error('error happend')
    }
  }
  return (
    <div className="w-full p-6 flex justify-center">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md" showCloseButton={true} >
          <DialogHeader>
            <DialogTitle>One-Time Password</DialogTitle>

          </DialogHeader>

          <div className="flex justify-center items-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6 text-center">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl >
                        <InputOTP maxLength={6} {...field} >
                          <InputOTPGroup >
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your e-mail.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit"> {isLoading ? <Loader2 className="animate-spin" /> : "submet"}</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      <ResetPasswordModal open={isResetPasswordModalOpen} onOpenChange={setIsResetPasswordModalOpen}/>
    </div>
  )
}
