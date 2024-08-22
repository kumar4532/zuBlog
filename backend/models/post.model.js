import mongoose, {Schema} from "mongoose";
import User from "../models/user.model.js"

const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model("post", postSchema);

export default Post;