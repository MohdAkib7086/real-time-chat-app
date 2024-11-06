const crypto =require('crypto');
const mongoose=require('mongoose');
const validator=require('validator');
// const bcrypt=require('bcryptjs');

const RegisterSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'Please enter the name']
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        // unique:true,
        // lowercase:true,
        // validate:[validator.isEmail,'please provide valid email']
    },
    password:{
        type:String,
        required:true,
        select:false
        // required:[true,'Please provide a password'],
        // minlength:[8,'Password must be 8 char long'],
        // select:false
    },
    image:{
        type:String,
        required:[true,'Please provide image'],
    }
},{timestamps:true})


const User=mongoose.model('User1',RegisterSchema);
module.exports=User;