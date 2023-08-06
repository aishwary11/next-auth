import { Schema, model } from "mongoose";

const User = model("User", new Schema({
    username: {
        type: String,
        required: [true, "Please provide a Username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true }));

export default User;