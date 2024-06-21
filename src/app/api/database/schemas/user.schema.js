const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    "first_name": {
        type: String,
        required: true,
    },
    "last_name": {
        type: String,
        required: true,
    },
    "dob": {
        type: String,
        required: true,
    },
    "gender": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        unique: true,
        required: true,
        set: (value) => {
            return value.toLowerCase();
        }
    },
    "password": {
        type: String,
    },
    "phone": {
        type: Number,
        required: true,
    },
    "address": {
        type: String,
        required: true,
    },
    "card_number": {
        type: String,
    },
    "role": {
        type: String,
        required: true,
    },
    "start_date": {
        type: String,
        required: true,
    },
    "id_card": {
        type: String,
    },
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;