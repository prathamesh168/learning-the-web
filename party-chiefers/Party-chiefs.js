const mongoose = require("mongoose")
const cors = require("cors");
const bodyparser = require('body-parser')
const jwt = require("jsonwebtoken")
const exp = require("express")
const app = exp();
const Port = 3009
const mongoURI = 'mongodb+srv://prathamesh:mulay@cheifandcustomer.u6pxjjm.mongodb.net/dataimp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


// database schemas
const AdminSchema = new mongoose.Schema({
   
    email: String,
    password: String

},{ collection: 'chiefs' })
const CustomerSchema = new mongoose.Schema({
    
    email: String,
    password: String

},{ collection: 'customers' })

const subschema = new mongoose.Schema({name : String , vvg: Boolean, type: String })
const CuisinesSchema = new mongoose.Schema({
    cuisines: [subschema],
    price:Number,
    NOP: Number // number of people
},{ collection: 'cuisines' })

const messages = new mongoose.Schema({sender: Boolean , message: String})
const ChatsSchema = new mongoose.Schema({
    Customerid: Number,
    Adminid: Number,
    messages: [messages]
},{ collection: 'chats' })

const BookingsSchema = new mongoose.Schema({
    Customerid: Number,
    Cuisineid: Number,
    DOB: Date, // date of booking
    DOS: Date,// date of service
    NPS: Number, //number of people serving,
    transactionid: Number
},{ collection: 'chats' })

//database models
const Admin = mongoose.model("Admin" , AdminSchema);
const Customer = mongoose.model("Customer",CustomerSchema);
const Cuisines = mongoose.model("Cuisines",CuisinesSchema);
const Chats = mongoose.model("Chats",ChatsSchema);
const Bookings = mongoose.model("Bookings",BookingsSchema)

app.use(cors());
app.use(bodyparser.json())

app.get("/" , (req,res)=> {
   console.log(" this is homepage ")
   res.send("this is homepage")
})


const secretKey = "Customer is god"
const generatetoken = (user)=>{
    const payload = {
        email : user.email,
        password : user.password};
    const ans = jwt.sign(payload, secretKey,{expiresIn:"1h"})
    return ans
}

const Authenticateme = (req,res,next) =>{
    const authheader = req.headers.authorization; 
    if (authheader){

        const data = authheader.split(" ");
        jwt.verify(data,secretKey, (err,user)=>{
            if(err){
                return res.senStatus(403);

            }
            req.user = user;
            next();
        })
    }
    else{
        res.sendSatatus(403);
    }
}



app.post("/admin/signup" , async (req,res)=> {
    const { email , password} = req.body
    const admins = await Admin.findOne({username});
    if (admins){
        res.status(404).json({message: "admin already exist"});
    }
    else{
        const newAdmin = new Admin({email,password});
        await newAdmin.save();
        const token = "Bearer " + generatetoken({username,email,password});
       
        res.json({message: "admin craeted sucessfully", token : token});
    }
 })

app.post("/admin/signin" ,async (req,res)=> {
    const {username,password} = req.body;
    const admin =await Customer.findOne(u =>(u.email == username || u.username == username) && u.password == password); 
    if(admin){
        const token = "Bearer " + generatetoken(admin);
        res.json({message : "logged in sucessfully" , token: token}); 
    }
    else{
        res.sendStatus(403);
    }
})
 
app.get("/admin/profile" , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })


 function getCuisines(req,res){
    const username = req.headers.user.username;
    const cuisines = Cuisines.find({username});
    if(cuisines){
        res.json({cuisines});
    }
    else{
        res.sendSatatus(403).json({message: "data not found"});
    }
    
}
app.get("/admin/cuisines" , getCuisines)


 app.get("/admin/chats/:customerid",Authenticateme , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })


 app.post("/customer/signup" , async (req,res)=> {
     const {email , password} = req.body
     const customers = await Customer.findOne({username});
     if (customers){
         res.status(404).json({message: "admin already exist"});
        }
        else{
            const newCustomer = new Customer({username,email,password});
            await newCustomer.save();
            const token = "Bearer " + generatetoken({username,email,password});
            req.headers.authorization = token;
            res.json({message: "Customer craeted sucessfully", token : token});
        }
    })

app.post("/customer/signin" , async (req,res)=> {
    const {username,password} = req.body;
    const customer = await Customer.findOne(u =>(u.email == username || u.username == username) && u.password == password); 
    if(customer){
        const token = generatetoken(customer);
        req.headers.authorization = "Bearer " + token;
        res.json({message : "logged in sucessfully" , token: token}); 
    }
    else{
        res.sendStatus(403);
    }
})
 
app.get("/customer/profile" ,Authenticateme, (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })


app.get("/customer/cheiflist",Authenticateme , (req,res)=> {
    
    const cuisines = Cuisines.find({});
    if(cuisines){
        res.json({cuisines});
    }
    else{
        res.sendSatatus(403).json({message: "data not found"});
    }
})

app.get("/customer/bookings",Authenticateme , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.get("/customer/cheiflist/:cuisineid",Authenticateme , (req,res)=> {
    const {cuisineid} = req.params;
    const cuisines = Cuisines.findById({cuisineid});
    if(cuisines){
        res.json({cuisines});
    }
    else{
        res.sendSatatus(403).json({message: "data not found"});
    }
 })

app.post("/customer/booking/:cuisineid",Authenticateme , (req,res)=> {
    res.send("this is homepage")


    
 })

 app.get("/customer/chats",Authenticateme , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.get("/customer/chats/:chiefid",Authenticateme , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

 app.get("/admin/chats" ,Authenticateme, (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })


app.listen(Port,()=>{
    console.log("listening on the "+ Port);
})