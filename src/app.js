//app.js
//basic express application setup
const express=require('express');
const cors=require('cors');
require("dotenv").config();
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{res.json({
    message:"E-Library api is running"
});
})
module.exports=app;