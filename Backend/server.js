import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express()
const port = 3000


app.get("/", (req, res)=>{
    res.send("Server is ready.")
})

console.log(process.env.MONGO_URI)


app.listen(port, ()=>{
    connectDb();
    console.log(`server started at http://localhost:${port}`)
})
// VhdF3eBEnRmyDWsM