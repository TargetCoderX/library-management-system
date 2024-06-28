import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const GET = async (request) => {

    /* access secure folder images using next js */
    const imageName = await request.nextUrl.searchParams.get("image");
    const imagePath = path.join(process.cwd(), '/storage/book_image', imageName);
    if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const response = new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });
        return response;
    }
}