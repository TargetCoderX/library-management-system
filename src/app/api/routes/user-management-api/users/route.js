import userModel from "@/app/api/database/schemas/user.schema";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
export const GET = async () => {
    const getUsers = await userModel.aggregate([
        {
            $group: {
                "_id": "$role",
                "users": { $push: "$$ROOT" },
            }
        }, {
            $project: {
                users: {
                    password:0,
                }
            }
        }
    ]);

    return NextResponse.json(getUsers)
}

export const POST = async (request) => {
    const formData = await request.formData();
    try {
        let filename = ''
        if (formData.get("id_card") !== '') {
            const file = formData.get("id_card");
            const buffer = Buffer.from(await file.arrayBuffer());
            const extension = file.name.split('.').pop();
            filename = `${new Date().getTime()}.${extension}`
            await writeFile(
                path.join(process.cwd(), "storage/id_cards/" + filename),
                buffer
            );

        }

        /* create user */
        const createUser = new userModel({
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            dob: formData.get('dob'),
            gender: formData.get('gender'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            card_number: formData.get('card_number'),
            role: formData.get('role_type'),
            start_date: formData.get('start_date'),
            id_card: filename,
            password: '',
        })
        createUser.save();
        return NextResponse.json({ message: "User Created Successfully", status: 1 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "User Creation Failed", status: 0, error });
    }
}

export const PATCH = () => {

}

export const DELETE = () => {

}