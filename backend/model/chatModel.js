const { text } = require('body-parser');
const crypto =require('crypto');
const mongoose=require('mongoose');
const { type } = require('os');
const validator=require('validator');
// const bcrypt=require('bcryptjs');

const chatSchema= mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },
    senderName:{
        type:String,
        required:true
        // unique:true,
        // lowercase:true,
        // validate:[validator.isEmail,'please provide valid email']
    },
    recieverId:{
        type:String,
        required:true,
    },
    message:{
        text:{
            type:String,
            default:''
        },
        image:{
            type:String,
            default:''
        }
    },
    status:{
      type:String,
       default:'unseen'
    }
},{timestamps:true})


const Chat=mongoose.model('chat',chatSchema);
module.exports=Chat;