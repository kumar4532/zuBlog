import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'


const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handleRegister=async ()=>{
    
    try{
      const res=await axios.post("/api/auth/signup",{fullname,username,email,password})  
      
      if (!fullname || !username || !email || !password) {
        setError(true)
      }

      setFullname(res.data.fullname)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)

      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/")
      
    }
    catch(err){
      setError(true)
      console.log(err)
    }
  }

  return (
    <>
    <div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left">Create an account</h1>
         <input onChange={(e)=>setFullname(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your fullname" />
         <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
         <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button>
         {error && <h3 className="text-red-500 text-sm ">Please enter all the feilds correctly</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>
    </>
    
  )
}

export default Register