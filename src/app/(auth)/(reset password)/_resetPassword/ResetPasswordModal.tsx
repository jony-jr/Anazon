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
import { resetPasswowrd, verifyResetCode } from "../forgetpassword/forgetPassword.action"
import { toast } from "sonner"
import { FloatingLabelInput } from "@/components/ui/floatingLabelInput"
import { Logo } from "@/components/ui/shadcn-io/navbar-04"
import { useRouter } from 'next/navigation'

interface VerifyCodeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
const resetPasswordModalSchema = z.object({
    email: z.email('Email is required'),
    newPassword: z.string().nonempty('new password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'uppercase letter, lowercase letter, digit, special character, at least 8 characters long'),

})

export default function ResetPasswordModal({ open, onOpenChange }: VerifyCodeModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const registerForm = useForm<z.infer<typeof resetPasswordModalSchema>>({
        resolver: zodResolver(resetPasswordModalSchema),
        defaultValues: {
            email: "",
            newPassword: "",
        },
    })

    const { control, handleSubmit } = registerForm;

    async function mySumbmit(data: z.infer<typeof resetPasswordModalSchema>) {
        console.log("🚀 ~ mySumbmit ~ data:", data)
        setIsLoading(true);

        const outPut = await resetPasswowrd(data)
        setIsLoading(false);
        if (outPut) {
            toast.success(`Updated Succesfully`, {
                style: {
                    "--normal-bg": "var(--background)",
                    "--normal-text":
                        "light-dark(var(--color-green-600), var(--color-green-400))",
                    "--normal-border":
                        "light-dark(var(--color-green-600), var(--color-green-400))",
                } as React.CSSProperties,
            });
            onOpenChange(false);
            router.replace("/login");
        } else {
            toast.error('error happend')
        }
    }

    return (
        <div className="w-full p-6 flex justify-center">
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md" showCloseButton={true} >
                    <DialogHeader>
                        <DialogTitle>Update your data</DialogTitle>
                    </DialogHeader>
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
                                                label="your email"
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
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem className="gap-0.5">
                                        <FormControl>
                                            <FloatingLabelInput
                                                className="rounded-2xl text-sm -translate-y-full"
                                                id="password"
                                                label="new password"
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
                            <Button disabled={isLoading} type="submit"> {isLoading ? <Loader2 className="animate-spin" /> : "Update"}</Button>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>
        </div>
    )
}
