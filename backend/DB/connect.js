import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log('\n MongoDB Connected !!');
    } catch (error) {
        console.log("Couldn't connect to DATABASE", error);
        process.exit(1);
    }
}

export default connectDB;