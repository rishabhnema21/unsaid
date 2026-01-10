"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useCompletion } from "@ai-sdk/react";
import { useEffect, useState } from "react";

const page = () => {
  const params = useParams<{ username: string }>();
  const username = params.username;
  // console.log(params);

  const placeholderQuestions: string[] = [
    "What’s your secret talent no one knows about?",
    "If you could swap lives with anyone for a day, who would it be?",
    "What’s the weirdest food combo you secretly love?",
    "Would you rather explore space or the deep sea?",
    "What’s a totally random question you’d ask a stranger?",
  ];

  const [questions, setQuestions] = useState<string[]>(placeholderQuestions);

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/suggest-messages",
  });

  useEffect(() => {
    const splitQuestions = completion
      .split("||")
      .map((q) => q.trim())
      .filter(Boolean);

    if (splitQuestions.length > 0) {
      setQuestions(splitQuestions);
    }
  }, [completion]);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const content = data.content;
      const response = await axios.post("/api/send-messages", {
        username,
        content,
      });
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Not Sent! try again");
    }
  };

  return (
    <main className="bg-[#f8f9fa] md:h-screen">
      <div className="py-9 md:py-14 px-6 md:px-14">
        <h3 className="text-3xl text-center md:text-start font-bold">
          Got something <span className="italic font-semibold">unsaid</span> for{" "}
          <span className="text-zinc-700 font-extrabold">{username}</span>?
        </h3>
        <p className="text-xl text-center md:text-start md:text-2xl font-light">Say it here. Stay anonymous.</p>

        <div className="flex flex-col md:flex-row">
          <div className="mt-8 md:mt-12 w-full text-center md:text-start md:w-[50vw]">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Textarea
                {...form.register("content")}
                placeholder="Say it. They'll never know it's you!"
                rows={15}
                className="w-full md:w-3/4 h-[30vh]"
              />
              {form.formState.errors.content && (
                <p className="text-red-500 mt-1 text-sm">
                  {form.formState.errors.content.message}
                </p>
              )}

              <Button type="submit" className="mt-5">
                Say it
              </Button>
            </form>

            <h3 className="italic font-light text-xl mt-5">
              Don't be weird. Keep it respectful
            </h3>

            <div className="mt-5">
              <h2 className="text-xl font-bold">
                Curious what people would say to you?
              </h2>
              <Link href="/sign-up">
                <Button className="mt-2 w-32" variant="unsaid">
                  Join Unsaid
                </Button>
              </Link>
            </div>
          </div>

          <div className="border mt-8 md:mt-0 border-zinc-500 rounded-xl h-[75vh] w-full md:w-[50vw]">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-2xl px-3 py-2 font-semibold">
                Hot takes from <span className="italic">unsaid</span>
              </h3>
              <p className="px-3 text-xl font-light">Click on any of message to adding it!</p>
              </div>
              <Button
                onClick={() => {
                  setQuestions([]);
                  complete("");
                }}
                disabled={isLoading}
                className="mr-4"
              >
                {isLoading ? "Generating..." : "Get suggestions"}
              </Button>
            </div>

            <div className="mt-7 flex flex-col space-y-3">
              {questions.map((question, index) => (
                <div
                  key={index}
                  onClick={() => {
                    form.setValue("content", question, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                  }}
                  className="mr-3 md:w-3/4 ml-3 cursor-pointer hover:bg-zinc-200 transition-all duration-200 ease-out rounded-sm px-3 py-2 border border-zinc-700"
                >
                  <p className="text-wrap">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
