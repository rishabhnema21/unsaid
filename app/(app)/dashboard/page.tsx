"use client";

import Navigation from "@/components/Navigation";
import { Message } from "@/model/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import MessageCard from "@/components/MessageCard";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id.toString() !== messageId));
  };

  const { data: session, status } = useSession();
  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch Message settings"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        // console.log(response.data);
        setMessages(response.data.messages || []);
        if (refresh) {
          toast("Showing Latest Messages");
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message ||
            "Failed to fetch Message settings"
        );
      } finally {
        setIsSwitchLoading(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to Switch State"
      );
    }
  };

if (status === "loading") {
  return (
    <div className="flex flex-col h-[70vh] justify-center items-center">
    <img className="h-[40%] w-auto" src="/unsaidasset02.png" alt="loading dashboard" />
      <p className="text-xl font-medium">Loading dashboard...</p>
    </div>
  );
}

if (status === "unauthenticated") {
  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-3xl font-bold">Please Sign In First!</h2>
    </div>
  );
}


  const { username } = session?.user as User;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast("Copied!!!");
  };

  return (
    <div className="bg-[#f8f9fa]">
      <div className="px-6 md:px-16 py-10 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold">
              Welcome <span className="text-zinc-700">{username}</span>.
            </h1>
            <h2 className="text-2xl font-bold mt-5 md:mt-9">
              Your <span className="text-zinc-700">unsaid</span> link
            </h2>
            <div className="flex items-center">
              <input
                className="text-base font-light bg-zinc-200 w-full py-2 pl-1 mr-1 rounded-sm"
                type="text"
                value={profileUrl}
                disabled
              />
              <Button onClick={copyToClipboard}>
                <Copy />
              </Button>
            </div>

            <div className="h-[40vh] md:h-[52vh]">
              <img
                className="h-full w-full object-cover"
                src="/unsaidasset03.png"
                alt="unsaid image"
              />
            </div>
          </div>

          <div>
            <div className="mb-5 flex flex-col md:flex-row justify-between">
              <h2 className="text-2xl font-bold">
                They <span className="text-zinc-700">finally</span> said it!
              </h2>
              <span className="flex mt-3 md:mt-0 space-x-2 items-center">
                Accepting Messages?{" "}
                <span className="mr-2">
                  <Switch
                    {...register("acceptMessages")}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                  />
                </span>
              </span>
            </div>
            <div className="message-box no-scrollbar h-[65vh] w-full md:w-[50vw] overflow-y-scroll overflow-x-hidden border border-black rounded-2xl">
              <div className="w-full px-5 py-5 flex flex-col  space-y-5">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <MessageCard
                      key={message._id.toString()}
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center flex-col space-y-4">
                    <img
                      src="/unsaidasset04.png"
                      alt="no message"
                      className="w-64 max-w-full object-contain"
                    />
                    <h2 className="text-3xl font-semibold text-center">
                      No Message to Display!
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
