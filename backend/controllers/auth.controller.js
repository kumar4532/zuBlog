import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookies from "../utils/generateToken.js"

const signup = async(req, res) => {
    try {
        const { fullname, username, email, password } = req.body

        if (!fullname || !username || !email || !password) {            
            return res.status(400).json("Please enter all the fields")
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json("User already exists with same email");
            } 
            if (existingUser.username === username) {
                return res.status(400).json("User already exists with same username");
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            username,
            email,
            password: hashedPassword
        })

        generateTokenAndSetCookies(user._id, res)
        
        return res
        .status(200)
        .json({
            message: "User signed up successfully",
            user
        })


    } catch (error) {
        console.log("Error in signup controller", error);
        throw new error
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({
            email: email
        })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {            
            return res.status(400).json("Invalid email or password")
        }
        
        generateTokenAndSetCookies(user._id, res)

        return res
        .status(200)
        .json({
            message: "User logged in successfully",
            user
        })
    } catch (error) {
        console.log("Error in login controller", error);
        throw new error;
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxage: 0})
        return res
        .status(200)
        .json({message:"User logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error);
        throw new error
    }
}

export {
    signup, 
    login,
    logout
}