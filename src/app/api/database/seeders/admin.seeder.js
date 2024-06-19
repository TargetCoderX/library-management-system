import { hashPassword } from "../../helpers/password_hasher";
import adminModel from "../schemas/admin.schema";


export const seedSuperAdmin = async () => {
    let getAdmin = await adminModel.findOne({ email: 'test@admin.com' });
    if (!getAdmin) {
        const admin = new adminModel({
            "name": 'admin',
            "password": await hashPassword('12345678'),
            "email": 'test@admin.com'
        })
        admin.save();
    }
}