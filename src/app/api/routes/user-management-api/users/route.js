import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
export const GET = () => {

}

export const POST = async (request) => {
    const formData = await request.formData();
    const file = formData.get("id_card");
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");
    try {
        // Write the file to the specified directory (public/assets) with the modified filename
        await writeFile(
            path.join(process.cwd(), "storage/id_cards/" + filename),
            buffer
        );

        // Return a JSON response with a success message and a 201 status code
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
        console.log("Error occurred ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }

    return NextResponse.json({ 'msg': 'hi' })
}

export const PATCH = () => {

}

export const DELETE = () => {

}