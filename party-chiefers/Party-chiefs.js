const mongoose = require("mongoose")
const cors = require("cors");
const bodyparser = require('body-parser')
const jwt = require("jsonwebtoken")
const exp = require("express");
const app = exp();
const Port = 3009
const mongoURI = 'mongodb+srv://prathamesh:mulay@cheifandcustomer.u6pxjjm.mongodb.net/dataimp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


// database schemas
const AdminSchema = new mongoose.Schema({
   
    email: String,
    password: String

},{ collection: 'admin' })
const CustomerSchema = new mongoose.Schema({
    
    email: String,
    password: String

},{ collection: 'customers' })

const subschema = new mongoose.Schema({name : String , vvg: Boolean, type: String })
const CuisinesSchema = new mongoose.Schema({
    owner : [{type: mongoose.Schema.Types.ObjectId , ref: "Admin"}],
    cuisines: [subschema],
    price:Number,
    NOP: Number // number of people
},{ collection: 'cuisines' })

const messages = new mongoose.Schema({sender: Boolean , message: String})
const ChatsSchema = new mongoose.Schema({
    Customerid: [{type: mongoose.Schema.Types.ObjectId , ref: "Customer"}],
    Adminid: [{type: mongoose.Schema.Types.ObjectId , ref: "Admin"}],
    messages: [messages]
},{ collection: 'chats' })

const BookingsSchema = new mongoose.Schema({
    Customerid: [{type: mongoose.Schema.Types.ObjectId , ref: "Customer"}],
    Cuisineid: [{type: mongoose.Schema.Types.ObjectId , ref: "Cuisines"}],
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
    // console.log(user);
    const payload = {
        email : user.email,
        password : user.password};
    const ans = jwt.sign(payload, secretKey,{expiresIn:"1h"})
    return ans
}
const Authenticateme = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const [scheme, token] = authHeader.split(" ");
  
      if (scheme.toLowerCase() !== "bearer" || !token) {
        return res.status(401).json({ message: "Invalid Authorization header format" });
      }
  
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          console.error(err);
          return res.status(403).json({ message: "Token verification failed" });
        }
        console.log(user);
        req.user = user.email;
    
        next();
      });
    } else {
      res.status(401).json({ message: "Authorization header is missing" });
    }
  };
    



app.post("/admin/signup" , async (req,res)=> {
    const { email , password} = req.body
    const admins = await Admin.findOne({email});
    if (admins){
        res.status(404).json({message: "admin already exist"});
    }
    else{
        const newAdmin = new Admin({email,password});
        await newAdmin.save();
        const token = "Bearer " + generatetoken({email,password});
        
        res.json({message: "admin craeted sucessfully", token : token});
    }
 })

app.post("/admin/signin" , async (req,res)=> {
    const { email, password } = req.body;

    try {
    const admin = await Admin.findOne({
        email:email,
        password: password
    });
    console.log(admin)
    if (admin) {
        const token = "Bearer " + generatetoken(req.body);
        res.json({ message: "logged in successfully", token: token });
    } else {
        res.sendStatus(403);
    }
    } catch (error) {
    // Handle any errors that might occur during the query
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    }

})
 
app.get("/admin/profile" , (req,res)=> {
    const data = req.user;
    res.json({data});
 })


 async function getCuisines(req,res){
    const email = req.user.email;
    const cuisines =await Cuisines.find({email :email});
    if(cuisines){
        res.json({cuisines});
    }
    else{
        res.sendStatus(403).json({message: "data not found"});
    }
    
}
app.get("/admin/cuisines",Authenticateme , getCuisines)


 app.get("/admin/chats/:customerid",Authenticateme , (req,res)=> {
    console.log(" this is homepage ")
    res.send("this is homepage")
 })

app.post("/admin/cuisines",Authenticateme,async (req,res)=>{
    const {cuisines,price,NOP} = req.body;
    console.log(req.user)
    const Adminid = await Admin.findOne({email: req.user.email});
    if (Adminid){
        
        newCuisine=new Cuisines({owner:Adminid._id , cuisines,price,NOP});
        newCuisine.save();
        res.json({message: "new cuisine menu added"});
    }
    else{
        res.sendStatus(404);
    }
})

// app.put("/admin/cuisines/:cuisineid",Authenticateme,async (req,res)=>{
//     // const {cuisines,price,NOP} = req.body;
//     const Adminid = await Admin.findOne({email:req.user.email});
//     console.log(req.params);
//     updatedCuisine=await Cuisines.findByIdAndUpdate(req.params.cuisineid,req.body,{new:true});
//     // newCuisine.save();
//     if ( updatedCuisine){

//         res.json({message: "cuisine menu has updated"});
//     }
//     else{
//         res.sendStatus(404);
//     }
// })
app.put("/admin/cuisines/:cuisineid", Authenticateme, async (req, res) => {
    try {
        console.log(req.user);
      // Retrieve the admin ID using async/await
      const admin = await Admin.find({ email: req.user});
        
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Update the cuisine using async/await
      const updatedCuisine = await Cuisines.findByIdAndUpdate(req.params.cuisineid, req.body, { new: true });
  
      if (updatedCuisine) {
        res.json({ message: "Cuisine menu has been updated", cuisine: updatedCuisine });
      } else {
        res.sendStatus(404); // You might consider using res.status(404).json(...) for consistency
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
app.post("/customer/signup" , async (req,res)=> {
     const {email , password} = req.body
     const customers = await Customer.findOne({email :username});
     if (customers){
         res.status(404).json({message: "admin already exist"});
        }
        else{
            const newCustomer = new Customer({email,password});
            await newCustomer.save();
            const token = "Bearer " + generatetoken({email,password});
            req.headers.authorization = token;
            res.json({message: "Customer craeted sucessfully", token : token});
        }
    })

app.post("/customer/signin" , async (req,res)=> {
    const { email, password } = req.body;

    try {
    const admin = await Customer.findOne({
        email:email,
        password: password
    });
    // console.log(admin)
    if (admin) {
        const token = "Bearer " + generatetoken(req.body);
        res.json({ message: "logged in successfully", token: token });
    } else {
        res.sendStatus(403);
    }
    } catch (error) {
    // Handle any errors that might occur during the query
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    }

})
 
app.get("/customer/profile" ,Authenticateme, (req,res)=> {
    const data = req.user;
    res.json({data}); 
 })


app.get("/customer/cuisines",Authenticateme ,async (req,res)=> {
    
    const cuisines = await Cuisines.find({});
    if(cuisines){
        res.json({cuisines});
    }
    else{
        res.sendStatus(403).json({message: "data not found"});
    }
})
app.get("/customer/bookings", Authenticateme, async (req, res) => {
    try {
      const user = await Customer.findOne({ email: req.user.email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const bookings = await Bookings.find({ Customerid: user._id });
  
      res.json({ bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
app.get("/customer/cuisines/:cuisineid",Authenticateme , (req,res)=> {
    const {cuisineid} = req.params;
    const cuisines = Cuisines.findById({cuisineid});
    if(cuisines){
        res.json({cuisines});
    }
    else{
        res.sendStatus(403).json({message: "data not found"});
    }
 })

app.post("/customer/booking/:cuisineid",Authenticateme ,async (req,res)=> {
    const {cuisineid,DOS,NOP,transactionid} = req.params;
    const DOB =  new Date();
    const username = req.user.email;
    const Customeri = await Customer.findOne({username});
    const Cuisine = await Cuisines.findOne({cuisineid});
    if (Customeri && Cuisine){
    const booking = new Bookings({Customeri, Cuisine ,DOB,DOS,NOP,transactionid});
    booking.save();
    res.json({message: "Booking is created"});
    }
    else{
        res.sendStatus(404);
    }
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