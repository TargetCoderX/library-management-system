import mongoose, { Schema } from "mongoose";

export const oneTimeUrlSchema = Schema({
    "token": {
        type: String,
        required: true,
    },
    "expire_time": {
        type: String,
        required: true,
    }
})

const oneTimeUrlModel = mongoose.models.onetimeurl || mongoose.model('onetimeurl', oneTimeUrlSchema);
export default oneTimeUrlModel;