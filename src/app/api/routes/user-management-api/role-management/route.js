import { roleModel } from "@/app/api/database/schemas/role_management.schema";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { role_name, role_description, role_id } = await request.json();
    if (!role_id) {
        try {
            const role = new roleModel({
                'role_name': role_name,
                'role_description': role_description,
            })
            const issuccess = await role.save();
            if (issuccess) {
                const getAllRoles = await roleModel.find();
                return NextResponse.json({ "message": "Role Created Successfully", "roles": getAllRoles, status: 1 }, { status: 200 });
            }
        } catch (error) {
            return NextResponse.json({ "message": error.message, status: 0 }, { status: 200 });
        }
    } else {
        try {
            const findRole = await roleModel.findOneAndUpdate({ _id: role_id }, { role_name, role_description }, { new: true, runValidators: true });
            if (findRole) {
                const getAllRoles = await roleModel.find();
                return NextResponse.json({ "message": 'User Updated Successfully', "roles": getAllRoles, status: 1 }, { status: 200 });
            }
        } catch (error) {
            return NextResponse.json({ "message": error.message, status: 0 }, { status: 200 });
        }
    }
    // return NextResponse.json({ 'msg': 'hi' })
}

/* get all roles */
export const GET = async () => {
    const getAllRoles = await roleModel.find();
    return NextResponse.json({ "message": 'Roles fetched successfully', "status": 1, "roles": getAllRoles })
}

/* delete role */
export const DELETE = async (request) => {
    const { element_id } = await request.json();
    try {
        await roleModel.deleteOne({ _id: element_id })
        const getCurrentRoles = await roleModel.find();
        return NextResponse.json({ msg: "Role Deleted Successfully", status: 1, current_roles: getCurrentRoles });
    } catch (error) {
        return NextResponse.json({ msg: "Something went wrong", status: 0, error });
    }
}