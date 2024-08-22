import Post from "../models/post.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createPost = async(req, res) => {
    try {
        const {title, content} = req.body
        const id = req?.user._id
        
        if (!title || !content) {
            return res.status(400).json("All fields are required")
        }
    
        const coverImagePath = req.file?.path;
        const coverImage = await uploadOnCloudinary(coverImagePath);
    
        const post = await Post.create({
            title,
            cover: coverImage.url,
            content,
            owner: id
        })
      
        return res
        .status(200)
        .json({
            message: "Post created successfully",
            post
        })
    } catch (error) {
        console.log("Error in create post controller", error);

        return res.status(500).json({
            message: "An error occurred while creating posts",
            error: error.message 
        });
    }
}

const deletePost = async(req, res) => {
    try {
        const {id} = req.params

        if (!id) {
            return res.status(400).json("Please enter correct id")
        }

        await Post.deleteOne({
            _id: id
        })

        return res
        .status(200)
        .json({
            message: "Post deleted successfully"
        })

    } catch (error) {
        console.log("Error in delete post controller", error);

        return res.status(500).json({
            message: "An error occurred while deleting posts",
            error: error.message 
        });
    }
}

const updatePost = async(req, res) => {
    try {
        const {id} = req.params
        const {title, content} = req.body

        if (!id) {
            return res.status(400).json("Please enter correct id")
        }
        
        if (!title && !content) {
            return res.status(400).json("Update fieldes are required")
        }

        const newCoverImagePath = req.file?.path;
        const newCoverImage = await uploadOnCloudinary(newCoverImagePath)

        const updateData = {};

        if (title) updateData.title = title;
        if (content) updateData.content = content;
        if (newCoverImage) updateData.cover = newCoverImage.url;
        
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                $set: updateData
            },
            {new: true}
        ).select("-owner")

        return res
        .status(200)
        .json({
            message: "Post updated successfully",
            updatedPost
        })

    } catch (error) {
        console.log("Error in update post controller", error);

        return res.status(500).json({
            message: "An error occurred while updating post",
            error: error.message 
        });
    }
}

const getPost = async(req, res) => {
    try {
        const {id} = req.params

        const post = await Post.findOne({
            _id: id
        }).populate('owner')

        return res
        .status(200)
        .json({
            message: "Post fetched successfully",
            post
        })
    } catch (error) {
        console.log("Error in get post controller",error);

        return res.status(500).json({
            message: "An error occurred while fetching post",
            error: error.message 
        });
    }
}

const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate('owner');

        return res
        .status(200)
        .json({
            message: "All posts fetched successfully",
            posts
        })
    } catch (error) {
        console.log("Error in all post controller", error);

        return res.status(500).json({
            message: "An error occurred while fetching posts",
            error: error.message 
        });
    }
}

const getAllUserPosts = async(req, res) => {
    try {
        const id = req?.user?._id

        const posts = await Post.find({
            owner: id
        })
        
        if (posts.length === 0) {
            return res.status(200).json("There aren't any posts from this user")
        }

        return res
        .status(200)
        .json({
            message: "Fetched all the posts for user",
            posts
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching posts" });
    }
}

const searchPost = async(req, res) => {
    try {
        const searchQuery = req.query.search;
        
        if (searchQuery) {
            const posts = await Post.find({
              $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } }
              ]
            }).populate("owner");
           
            res.json({ posts });
          } else {
            const posts = await Post.find();
            res.json({ posts });
          }
    } catch (error) {
        console.log("Error in search post controller", error);
        res.status(500).json({ message: "An error occurred while searching posts" });
    }
}


export {
    createPost,
    deletePost,
    updatePost,
    getPost,
    getAllPosts,
    getAllUserPosts,
    searchPost
}