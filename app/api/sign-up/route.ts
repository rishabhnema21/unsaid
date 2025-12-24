import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json(); 

        const alreadyVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (alreadyVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "username already taken"
            }, {status: 400})
        }
        
        const existUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random()*900000).toString();

        if (existUserByEmail) {
            if (existUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User Already Exist with this email"
                }, {status: 400})
            } else {
                if (!existUserByEmail.isVerified) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    existUserByEmail.password = hashedPassword;
                    existUserByEmail.verifyCode = verifyCode;
                    existUserByEmail.verifyCodeExpiry = new Date(Date.now() + 36000000);
                    await existUserByEmail.save();
                }
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 5);

            const newUser = new UserModel({
                username,
                email,
                hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            }) 

            await newUser.save();
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode,
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }

        return Response.json({
            success: true,
            message: "User Registered Successfully! Please Verify your Email"
        }, {status: 201})

    } catch(err) {
        console.error("Error Registering User", err);
        return Response.json({success: false, message: "Error Registering User"}, {status: 500})
    }
}