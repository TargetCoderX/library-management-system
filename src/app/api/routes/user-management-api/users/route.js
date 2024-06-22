import userModel from "@/app/api/database/schemas/user.schema";
import { accountMailer } from "@/app/api/helpers/maile_helper";
import { createOneTimeUrl } from "@/app/api/helpers/url_token";
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
                    password: 0,
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
        if (!formData.get('user_id')) {
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
            let response = await createUser.save()
            const token = await createOneTimeUrl(response._id);
            const url = `${process.env.APP_URL}/externals/generate-password/${response._id}/${token}`
            accountMailer(formData.get('email').trim().toLowerCase(), 'New User Account Created', "", `
            Hi ${formData.get('first_name')} <br>
            Welcome to ${process.env.APP_NAME}<br>
            We're excited to have you on board. Your account has been successfully created, and you're now part of our community.<br>
            Please click the below link to generate your password <br> ${url}
            `, (error, info) => {
                if (error) {
                    // console.log(error);
                    return NextResponse.json({ message: "User Creation Failed", status: 0, error });
                }
                if (info) {
                    // console.log(info);
                }
            })
            return NextResponse.json({ message: "User Created Successfully", status: 1 });
        } else {
            return PATCH(formData, filename);
        }
    } catch (error) {
        return NextResponse.json({ message: "User Creation Failed", status: 0, error });
    }
}

export const PATCH = async (formData, filename) => {
    try {
        await userModel.findOneAndUpdate({ _id: formData.get('user_id') }, {
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
        }, { new: true, runValidators: true })
        return NextResponse.json({
            message: "User Updated Successfully",
            status: 1,
        })
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong",
            status: 0,
            error
        })
    }
}

export const DELETE = async (request) => {
    const data = await request.json();
    try {
        await userModel.deleteOne({ _id: data.user_id });
        return NextResponse.json({ "message": "User Deleted Successfully", "status": 1 })
    } catch (error) {
        return NextResponse.json({ "message": "Something went wrong", "status": 0, error })
    }
}