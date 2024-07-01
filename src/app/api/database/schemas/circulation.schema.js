// import userModel from "./user.schema";

const { Schema, default: mongoose } = require("mongoose");

const circulationSchema = new Schema({
    "book_id": {
        type: Schema.Types.ObjectId,
        ref: "book_management",
        required: true,
    },
    "user_id": {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    "issue_date": {
        type: String,
        required: true,
    },
    "due_date": {
        type: String,
        required: true,
    },
    "is_active": {
        type: Number,
        required: true,
        default: 1,
    },
    "fine": {
        type: Number,
        required: true,
        default: 0
    }
})
export const circulationModel = mongoose.models.circulation || mongoose.model('circulation', circulationSchema);