import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import axios from "axios"
import Loader from "../components/Loader"
import { useParams, useNavigate } from "react-router-dom"


const EditPost = () => {

    const [loading, setLoading] = useState(false)
    const postId = useParams().id
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [cover,setCover] = useState(null)

    const fetchPost=async()=>{
      try{
        const res=await axios.get("/api/posts/"+postId)
        setTitle(res.data.post.title)
        setCover(res.data.post.cover)
        setContent(res.data.post.content)
      }
      catch(err){
        console.log(err)
      }
    }

    const handleUpdate=async (e)=>{
      e.preventDefault()
      setLoading(true)
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("cover", cover);

        try{
          const res = await axios.put("/api/posts/" + postId,formData,{withCredentials:true})
          alert("Post updated successfully!");
          
          if (res.data && res.data.updatedPost && res.data.updatedPost._id) {
            navigate("/posts/post/" + res.data.updatedPost._id);
          } else {
            console.error("Navigation failed: Invalid post ID in response.");
          }
        }
        catch(err){
          console.log(err);
          alert("There was an error updating the post. Please try again.");
        }
    } 

    useEffect(()=>{
      fetchPost()
    },[postId])

  return (
    <div>
        <Navbar/>
        <div className='px-6 md:px-[200px] mt-8'>
          <h1 className='font-bold md:text-2xl text-xl '>Update a post</h1>
          <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none'/>
            <input onChange={(e)=>setCover(e.target.files[0])} type="file"  className='px-4'/>
            <textarea onChange={(e)=>setContent(e.target.value)} value={content} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description'/>
            {loading ? <div className='mx-auto'><Loader /></div> : <button 
                onClick={handleUpdate} 
                className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'
                disabled={loading}
            >
              Update
            </button>}
          </form>
        </div>
        <Footer/>
    </div>
  )
}

export default EditPost