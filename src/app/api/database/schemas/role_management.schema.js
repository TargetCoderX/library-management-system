const { Schema, default: mongoose } = require("mongoose");

const role_management_schema = new Schema({
    "role_name": {
        type: String,
        required: true,
        unique: true,
        set: function (value) {

            return value.trim().charAt(0).toUpperCase() + value.trim().substr(1).toLowerCase();
        }
    },
    "role_description": {
        type: String,
        required: true,
        unique: true,
        set: (value) => {
            return value.trim();
        }
    },
}, { timestamps: true })

export const roleModel = mongoose.models.role || mongoose.model('role', role_management_schema);
export default roleModel;