const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();
const cors = require('cors'); // Import the cors package
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");

app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

dotenv.config({path:"./.env"})
const PORT=5000;
const DB=process.env.DATABASE_URL

mongoose.connect(DB,{
  }).then(con=>{
    console.log('connedted to remote DB');
});

const authRouter=require('./routes/authRoute')
const chatRouter=require('./routes/chatRoute')

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/chat/',authRouter)
app.use('/api/chat/',chatRouter)


app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})