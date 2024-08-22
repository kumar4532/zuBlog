import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
        const res = await axios.get("http://localhost:3000/api/posts/user/all", {withCredentials:true});
        
        setPosts(res.data.posts); 

        if (res.data.posts.length === 0) { 
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    } catch (err) {
      console.log(err);
      setNoResults(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
          ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;