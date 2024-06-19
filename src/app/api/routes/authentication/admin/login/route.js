import adminModel from "@/app/api/database/schemas/admin.schema";
import { createToken } from "@/app/api/helpers/jwt_token";
import { passwordCompare } from "@/app/api/helpers/password_hasher";
import { NextResponse } from "next/server";

export const POST = async (Request) => {
    const { email, password } = await Request.json();
    /* find user */
    let searchAdmin = await adminModel.findOne({ "email": email });
    if (searchAdmin) {
        const checkPassword = await passwordCompare(password, searchAdmin.password);
        if (checkPassword) {
            searchAdmin=  searchAdmin.toObject()
            delete searchAdmin.password
            delete searchAdmin.createdAt
            delete searchAdmin.updatedAt
            const token = await createToken(searchAdmin);
            return NextResponse.json({
                "status": 1,
                "message": 'Loggedin successfully',
                "token": token,
                "user": searchAdmin,
            })
        }
    }
    return NextResponse.json({ "status": 0, "msg": "Email and Password Mismatched" })
}