const express=require('express');
const mongoose=require('mongoose');
const axios=require('axios');
require('dotenv').config();
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('Mongodb connected succesfully'))
.catch((err)=>console.log('Some error occured',err));


const userSchema=new mongoose.Schema({
    countryname:String,
    countrycapital:String
});


const User=mongoose.model("User",userSchema);


app.post('/api/user',async (req,res)=>{
    try {
        const newDetail=new User(req.body);
        res.json(newDetail);
        await newDetail.save();
    } catch (error) {
res.json({message:error});        
    }
});


app.get('/api/user',async (req,res)=>{
    try {
        const allDetail=await User.find();
        console.log(allDetail);
        res.json(allDetail);
    } catch (error) {
        res.json({message:error});  
    }
});



app.delete('/api/user/:id',async (req,res)=>{
    try {
        User.findByIdAndDelete(req.params.id);
        res.json("User deleted successfully");
    } catch (error) {
        res.json({message:error});  
    }
});

app.put('/api/user/:id',async (req,res)=>{
    try {
        const updatedDetail=await User.findByIdAndUpdate(req.params.id,red.body,{new:true});
    res.json(updatedDetail);
    } catch (error) {
        res.json({message:error}); 
    }
})



const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
