const mongoose = require("mongoose")
const cors = require("cors");
const bodyparser = require('body-parser')
const jwt = require("jsonwebtoken")
const exp = require("express")
const fs = require("fs");
const app = exp();
const Port = 3009
const mongoURI = 'mongodb+srv://<username>:<password>@cheifandcustomer.u6pxjjm.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyparser.json())

app.get("/" , (req,res)=> {
   console.log(" this is homepage ")
   res.send("this is homepage")
})
const secretKey = "Customer is god"
const generatetoken = (user)=>{
    const payload = {
        username : user.username,
        email : user.email,
        password : user.password};
    const ans = jwt.sign(payload, secretKey,{expiresIn:"1h"})
    return ans
}

const Authenticateme = (req,res,next) =>{
    const username = req.headers.username;
    const email = req.headers.email;
    const password = req.headers.password;

    next();
}



app.post("/admin/signup" ,Authenticateme, (req,res)=> {
    const {username , email , password} = req.body
    
 })

app.post("/admin/signin" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })
 
app.get("/admin/profile" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })



app.post("/customer/signup" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.post("/customer/signin" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })
 
app.get("/customer/profile" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })


app.get("/customer/cheiflist" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.get("/customer/bookings" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.get("/customer/cheiflist/:chiefid" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.post("/customer/booking/:cheifid" , (req,res)=> {
    res.send("this is homepage")
 })

 app.get("/customer/chats" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.get("/customer/chats/:chiefid" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

 app.get("/admin/chats" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

 app.get("/admin/chats/:customerid" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })


app.listen(Port,()=>{
    console.log("listening on the "+ Port);
})