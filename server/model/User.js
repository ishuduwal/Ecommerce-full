import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobilenumber: {
        type: Number,
        require: true
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
})
const User = new mongoose.model("User", userSchema)
export default User;