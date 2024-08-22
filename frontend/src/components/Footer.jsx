import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-6 mt-4 flex flex-col justify-end items-end text-white bg-black">
      <div className="flex justify-evenly text-2xl">
        <Link to={"https://x.com/kumar6345"}><FaSquareXTwitter className="mr-2"/></Link>
        <Link><FaInstagramSquare className="mr-2"/></Link>
        <Link to={"https://github.com/kumar4532"}><FaSquareGithub  className="mr-2"/></Link>
      </div>
      <p className="mx-auto mt-2 text-sm">All rights reserved @Blog Market 2023</p>
    </div>  
  )
}

export default Footer