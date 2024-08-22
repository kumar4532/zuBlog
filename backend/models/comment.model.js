import mongoose, {Schema} from "mongoose";
import User from "../models/user.model.js"
import Post from "./post.model.js";

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Post,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Comment = mongoose.model("comment", commentSchema);

export default Comment;