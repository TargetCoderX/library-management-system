import oneTimeUrlModel from "@/app/api/database/schemas/one_time_url.schema";
import userModel from "@/app/api/database/schemas/user.schema";
import { hashPassword } from "@/app/api/helpers/password_hasher";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { user_id, token, password } = await request.json();
    /* check the token first */
    try {
        const checkIfTokenCorrect = await oneTimeUrlModel.findOne({ 'user_id': user_id, 'token': token });
        if (checkIfTokenCorrect) {
            try {
                await userModel.findOneAndUpdate({ _id: user_id }, { password: await hashPassword(password) })
                await oneTimeUrlModel.findOneAndDelete({ _id: checkIfTokenCorrect._id });
                return NextResponse.json({
                    message: "Password Updated Successfully",
                    status: 1,
                })
            } catch (error) {
                return NextResponse.json({
                    message: "Something went wrong while generating password",
                    status: 0,
                })
            }
        }else{
            return NextResponse.json({
                message: "Link expired please request a new link to admin",
                status: 0,
            })
        }
    } catch (error) {
        return NextResponse.json({
            message: "Link Expired",
            status: 0,
        })
    }

}