import mongoose, { Schema } from "mongoose";


const adminSchema = new Schema({
    "name": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    "password": {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true })

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default adminModel;
