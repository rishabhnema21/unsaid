"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "@/components/ui/input-group"

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const response = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    if (response?.error) {
      toast.error("Sign In Failed")
    } 

    if (response?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center md:min-h-screen bg-[#f8f9fa]">

      <div className="w-full mb-12 md:mb-0 md:w-1/2 flex flex-col md:flex-row justify-center items-center">
        <div className="h-[17vh] md:h-[40vh]">
          <img className="h-full w-full" src="/unsaidasset01.png" alt="random" />
        </div>
        <div className="w-3/4 md:w-1/2">
          <h2 className="text-2xl text-center md:text-start md:text-5xl font-bold">Let people tell you what they really think.</h2>
          <h4 className="md:mt-3 text-base text-center md:text-start md:text-2xl text-zinc-600 font-semibold italic">Anonymous messages. Real thoughts.</h4>
        </div>
      </div>

      <div className="w-[95vw] md:w-1/2 theme-font max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl mb-3 md:mb-6">
            Back to Unsaid.
          </h1>
          <p className="mb-2 md:mb-4">Sign In to continue the Mystery</p>
        </div>

        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="email/username">Email/Username</FieldLabel>
                  <Input {...field} placeholder="Enter here." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="between you & Unsaid"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit">
            Sign In
          </Button>
        </form>

        <div className="text-center mt-4">
          <p>
            New to the silence? → {" "}
            <Link href="/sign-up" className="text-zinc-400 hover:text-zinc-800">
              Join Unsaid
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
