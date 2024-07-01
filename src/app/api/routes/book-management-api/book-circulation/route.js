import { bookManagement } from "@/app/api/database/schemas/book_management.schema"
import { circulationModel } from "@/app/api/database/schemas/circulation.schema";
import userModel from "@/app/api/database/schemas/user.schema"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        /* get all users */
        const users = await userModel.find().select("first_name last_name _id");
        /* getting active books */
        const books = await bookManagement.find({ "status": 'Active' }).select("book_name _id author");

        /* get issue data with join of user data */
        const issueData = await circulationModel.find().populate('user_id', "first_name last_name").populate("book_id", "book_name author");
        return NextResponse.json({
            status: 1,
            books, users, issueData,
        })
    } catch (error) {
        return NextResponse.json({ status: 0, message: "Something went wrong", error });
    }
}

export const POST = async (request) => {
    const { user_id, book_id, issue_date_main, due_date_main } = await request.json();
    try {
        /* find if user has active lending data */
        const check = await circulationModel.find({ "user_id": user_id });
        if (!check || !check.some(value => value.is_active === 1)) {
            const circulation = new circulationModel({ user_id, book_id, issue_date: issue_date_main, due_date: due_date_main });
            await circulation.save()
            await bookManagement.findByIdAndUpdate(book_id, { status: "InActive" });
            return NextResponse.json({ status: 1, message: "Book issued successfully" });
        } else {
            return NextResponse.json({ status: 0, message: "User has to return the book first/ renew the same book" })
        }
    } catch (error) {
        return NextResponse.json({ status: 0, message: "Something went wrong while issuing the book", error });
    }
}

export const PATCH = async (request) => {
    const { circulationId, status } = await request.json();
    try {
        const data = await circulationModel.findByIdAndUpdate(circulationId, { "is_active": status });
        await bookManagement.findByIdAndUpdate(data.book_id.toString(), { status: status == 1 ? "InActive" : "Active" });
        return NextResponse.json({ status: 1, message: "Circulation updated succcessfully" });
    } catch (error) {
        return NextResponse.json({ status: 0, message: "Something went wrong", error });
    }

}