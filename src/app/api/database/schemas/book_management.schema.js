const { Schema, default: mongoose } = require("mongoose");

const bookManagementSchema = new Schema({
    "book_name": {
        type: String,
        required: true,
        unique: true,
    },
    "book_description": {
        type: String,
        required: true,
    },
    "author": {
        type: String,
        required: true,
    },
    "isbn": {
        type: String,
        required: true,
    },
    "publisher": {
        type: String,
        required: true,
    },
    "publish_date": {
        type: String,
        required: true,
    },
    "edition": {
        type: String,
        required: true,
    },
    "genre": {
        type: String,
        required: true,
    },
    "status": {
        type: String,
        required: true,
    },
    "acquisition_date": {
        type: String,
        required: true,
    },
    "cover_image": {
        type: String,
        required: true,
    },
})

export const bookManagement = mongoose.models.book_management || mongoose.model("book_management", bookManagementSchema)