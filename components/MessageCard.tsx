"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Message } from "@/model/User";
import { toast } from "sonner";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const handleDeleteConfirm = async () => {
    try {
      const messageId = message._id.toString();
      const response = await axios.delete<ApiResponse>(
        `/api/delete-messages/${messageId}`
      );

      toast.success(response.data.message);
      onMessageDelete(messageId);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{new Date(message.createdAt).toLocaleString()}</CardTitle>
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-2 h-5">
                  <X className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Once it’s gone, the secret disappears forever.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="-mt-7">
        <p>{message.content}</p>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
