import mongoose from "mongoose";


export const connectDb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${conn.connection.host}`)
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1) //1 code means exit eith failure and 0 for success
    }
}