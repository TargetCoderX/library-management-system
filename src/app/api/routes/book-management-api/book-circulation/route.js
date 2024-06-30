import { bookManagement } from "@/app/api/database/schemas/book_management.schema"
import userModel from "@/app/api/database/schemas/user.schema"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        /* get all users */
        const users = await userModel.find().select("first_name last_name _id");
        /* getting active books */
        const books = await bookManagement.find({ "status": 'Active' }).select("book_name _id author");
        return NextResponse.json({
            status: 1,
            books, users,
        })

    } catch (error) {
        return NextResponse.json({ status: 0, message: "Something went wrong", error });
    }
}