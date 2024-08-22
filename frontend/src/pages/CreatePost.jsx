import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [loading, setLoading] = useState(false)
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [cover,setCover] = useState(null)

    const navigate = useNavigate()

    const handleCreate = async(e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("cover", cover);

        console.log(formData.get());
        

        try{
          const res = await axios.post("/api/posts/",formData,{withCredentials:true})
          alert("Post created successfully!");
        
          if (res.data) {
            navigate("/posts/post/"+res.data.post._id)
          }
        }
        catch(err){
          console.log(err);
          alert("There was an error creating the post. Please try again.");
        }
    }
    
  return (
    <div>
      <Navbar/>
        <div className='px-6 md:px-[200px] mt-8'>
          <h1 className='font-bold md:text-2xl text-xl '>Create a post</h1>
          <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none'/>
            <input onChange={(e)=>setCover(e.target.files[0])} type="file"  className='px-4'/>
            <textarea onChange={(e)=>setContent(e.target.value)} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post content'/>
            {loading ? <div className='mx-auto'><Loader /></div> : <button 
                onClick={handleCreate} 
                className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'
                disabled={loading}
            >
              Create
            </button>}
          </form>
        </div>
      <Footer/>
    </div>
  )
}

export default CreatePost