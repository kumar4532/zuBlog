import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"


const PostDetails = () => {

  const postId=useParams().id
  const [post,setPost]=useState({})
  const {user}=useContext(UserContext)
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  

  const fetchPost=async()=>{
    setLoader(true)
    try{
      const res= await axios.get("/api/posts/"+postId)
      setPost(res.data.post)
      setLoader(false)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDeletePost=async ()=>{
    try{
      const res=await axios.delete("/api/posts/"+postId,{withCredentials:true})
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    fetchPost()
  },[postId])
  
  return (
    <div>
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post.owner?._id && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            {post.owner && post.owner.username ? (
              <p>@{post.owner.username}</p>
            ) : (
              loader
            )}
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            </div>
          </div>
          <img
            src={post.cover}
            className="w-full mx-auto mt-8"
            alt=""
          />
          <p className="mx-auto text-base font-semibold mb-4 mt-8 whitespace-pre-wrap">{post.content}</p>
          <Comment className="mb-2" postId={postId}/>
        </div>
      )}
    </div>
  );
}

export default PostDetails