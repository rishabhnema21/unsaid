import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  await dbConnect();
  const {messageId} = await params;
  const session = await getServerSession(authOptions);
  // console.log("Server session: ",session);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const messageObjectId = new mongoose.Types.ObjectId(messageId);

    const updatedResult = await UserModel.updateOne(
      { _id: userId },
      {
        $pull: {
          messages: { _id: messageObjectId },
        },
      }
    );

    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Where is message bro? May be already deleted!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Chill now! we erased your secret :D" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Hey, We couldn't bro, sorry :(" },
      { status: 500 }
    );
  }
}
