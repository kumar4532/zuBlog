import axios from "axios"
import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext"
 

const Home = () => {

  const {search}=useLocation()
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const {user}=useContext(UserContext)

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const query = new URLSearchParams(search).get("query");

      const url = query 
        ? `/api/posts?search=${encodeURIComponent(query)}`
        : "h/api/posts/all/posts";

      const res = await axios.get(url);
      
      setPosts(res.data.posts)
      if(res.data.posts.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false) 
    }
    catch(err){
      console.log(err)
      setNoResults(true)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[search])


  return (
    <>
    <Navbar/>
      <div className="px-8 md:px-[200px] min-h-screen">
          {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader/></div> : 
            (!noResults?
              posts.map((post)=>(
                <Link key={post._id} to={user?`/posts/post/${post._id}`:"/login"}>
                  <HomePosts post={post}/>
                </Link>
            )):<h3 className="text-center font-bold py-56">No posts available</h3>)}
      </div>
    <Footer/>
    </>    
  )
}

export default Home