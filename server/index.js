require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected To database."))
.catch((error) => console.error("Falid to Connect." + error))



app.listen(process.env.PORT, ()=>{
    console.log(`Server is started on http://localhost:${process.env.PORT}.`)
})