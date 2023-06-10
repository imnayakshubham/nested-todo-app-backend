import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email_id: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        min: [8, "Password must be 8 characters long"],
        required: [true, "Password is required"],
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    profile_pic: {
        type: String,
        required: true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    access: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;