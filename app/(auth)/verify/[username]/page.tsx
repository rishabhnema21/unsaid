"use client";

import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      });

      toast("Success", {
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      console.log("Error in verification of code: ", error);
      toast("Error", {
        description: "Some Error Occured in Verification",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f8f9fa]">
      <div className="max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="w-full flex justify-center items-center">
            <img className="h-full w-56" src="/unsaidasset02.png" alt="verify account" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-light lg:text-4xl mb-3">
            Verify Your Account
          </h1>
          <p className="mb-6 text-xl font-light font-zinc-600">
            Enter the Verification Code sent to your Email
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center">
              <InputOTP
                maxLength={6}
                value={form.watch("code")}
                onChange={(value) =>
                  form.setValue("code", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {form.formState.errors.code && (
              <p className="text-red-900 text-sm text-center">
                {form.formState.errors.code.message}
              </p>
            )}

            <Button
              className="mt-6"
              type="submit"
              disabled={form.watch("code")?.length !== 6}
            >
              Verify
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
