import { bookManagement } from "@/app/api/database/schemas/book_management.schema"
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

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
        await bookManagementModel.save({ runValidators: true });
        return NextResponse.json({ status: 1, message: "Book Added successfully" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 0, message: "Something went wrong", error })
    }
}

export const GET = async (request) => {
    const bookId = request.nextUrl.searchParams.get('bookid');
    if (!bookId) {
        const data = await bookManagement.find();
        return NextResponse.json({ status: 1, message: "book fetched successfully", books: data });
    } else {
        const data = await bookManagement.find({ _id: bookId });
        return NextResponse.json({ status: 1, message: "book fetched successfully", book: data });
    }
}

export const PUT = async (request) => {
    const data = await request.formData();
    const bookid = data.get('_id');
    try {
        let updatedData = {
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
        };
        if (typeof data.get('cover_image') !== 'undefined')
            updatedData.cover_image = await uploadFile(data);
        await bookManagement.findByIdAndUpdate(bookid, updatedData, { new: true, runValidators: true })
        return NextResponse.json({ status: 1, message: "Book updated successfully" })
    } catch (error) {
        return NextResponse.json({ status: 0, message: "Something went wrong", error })
    }
}

export const DELETE = async (request) => {
    const { bookid } = await request.json();
    try {
        const getBook = await bookManagement.findById(bookid);
        if (getBook) {
            const isdeleted = await deleteFile(getBook);
            if (isdeleted === 0)
                return NextResponse.json({ status: 0, message: "Something went wrong", error })
            else
                await bookManagement.findByIdAndDelete(bookid);
        }
        return NextResponse.json({ status: 1, message: "Book deleted successfully" })
    } catch (error) {
        return NextResponse.json({ status: 0, message: "Something went wrong", error })
    }
}

const uploadFile = async (data) => {
    let filename = ''
    if (data.get('_id')) {
        const findBook = await bookManagement.findById(data.get('_id'));
        if (findBook) {
            const imagename = findBook.cover_image;
            if (imagename !== 'noimage.jpg') {
                const filepath = path.join(process.cwd(), `storage/book_image/${imagename}`);
                fs.unlink(filepath, (err) => {
                    if (err) {
                        console.log(err); return;
                    } else {
                        console.log("Deleted");
                    }
                })
            }
        }
    }
    if (typeof data.get('cover_image') !== 'undefined' && data.get('cover_image') !== 'null') {
        const file = data.get("cover_image");
        const buffer = Buffer.from(await file.arrayBuffer());
        const extension = file.name.split('.').pop();
        filename = `${new Date().getTime()}.${extension}`
        await writeFile(
            path.join(process.cwd(), "storage/book_image/" + filename),
            buffer
        );
    } else {
        filename = 'noimage.jpg';
    }
    return filename;
}

const deleteFile = async (findBook) => {
    const imagename = findBook.cover_image;
    if (imagename !== 'noimage.jpg') {
        const filepath = path.join(process.cwd(), `storage/book_image/${imagename}`);
        fs.unlink(filepath, (err) => {
            if (err) {
                return 0;
            } else {
                return 1;
            }
        })
    }
}