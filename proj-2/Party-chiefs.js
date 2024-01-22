
const cors = require("cors");
const bodyparser = require('body-parser')
const exp = require("express")
const fs = require("fs")
const app = exp();
const Port = 3009
app.use(cors());
app.use(bodyparser.json())

app.get("/" , (req,res)=> {
   console.log(" this is homepage ")
   res.send("this is homepage")
})



app.post("/admin/signup" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
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