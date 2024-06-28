import { bookManagement } from "@/app/api/database/schemas/book_management.schema"
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const POST = async (request) => {
    const data = await request.formData()
    try {
        const bookManagementModel = new bookManagement({
            "book_name": data.get("book_name"),
            "book_description": data.get("book_description"),
            "author": data.get("author"),
            "isbn": data.get("isbn"),
            "publisher": data.get("publisher"),
            "publish_date": data.get("publish_date"),
            "edition": data.get("edition"),
            "genre": data.get("genre"),
            "status": data.get("status"),
            "acquisition_date": data.get("acquisition_date"),
            "cover_image": await uploadFile(data),
        });
        bookManagementModel.save();
        return NextResponse.json({ status: 1, message: "Book Added successfully" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 0, message: "Something went wrong", error })
    }
}

export const GET = async () => {
    const data = await bookManagement.find();
    return NextResponse.json({ status: 1, message: "book fetched successfully", books: data });
}

const uploadFile = async (data) => {
    let filename = ''
    if (data.get("cover_image") !== '') {
        const file = data.get("cover_image");
        const buffer = Buffer.from(await file.arrayBuffer());
        const extension = file.name.split('.').pop();
        filename = `${new Date().getTime()}.${extension}`
        await writeFile(
            path.join(process.cwd(), "storage/book_image/" + filename),
            buffer
        );
    }
    return filename;
}