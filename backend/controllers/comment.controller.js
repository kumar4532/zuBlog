import Comment from "../models/comment.model.js"

const createComment = async(req, res) => {
    try {
        const {postId} = req.params
        const userId = req?.user._id
        const {comment} = req.body

        const newComment = await Comment.create({
            owner: userId,
            postId,
            comment
        })
    
        return res
        .status(200)
        .json({
            message: "Comment created successfully",
            newComment
        })
    } catch (error) {
        console.log("Error in create comment controller", error);
    }
}

const deleteComment = async(req, res) => {
    try {
        const {commentId} = req.params

        await Comment.findByIdAndDelete(commentId)

        return res
        .status(200)
        .json("Comment deleted successfully")
    } catch (error) {
        console.log("Error in delete comment controller", error);
    }
}

const updateComment = async(req, res) => {
    try {
        const {commentId} = req.params
        const {comment} = req.body

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            {
                $set:{
                    comment
                }
            },
            {new:true}
        ).select("-postId -owner")

        return res
        .status(200)
        .json({
            message: "Comment has been updated",
            updatedComment
        })
    } catch (error) {
        console.log("Error in update comment controller", error);
        
    }
}

const getComment = async(req, res) => {
    try {
        const postId = req.params

        const comment = await Comment.find(postId).populate("owner")

        return res
        .status(200)
        .json({
            message: "Comment fetched",
            comment
        })
    } catch (error) {
        console.log("Error in get comment controller", error);
        
    }
}

export {
    createComment,
    deleteComment,
    updateComment,
    getComment
}