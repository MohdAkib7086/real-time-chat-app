const formidable = require('formidable');
const validator=require('validator');
const User = require('../model/authModel');
const fs=require('fs');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports.register=(req,res,next)=>{
    // console.log('Register is working');

    const form = new formidable.IncomingForm();
    form.parse(req,async(err,fields,files)=>{
        // console.log(fields);
        //    let{userName,email,password,confirmPassword}=fields;
        const userName=fields?.userName&&fields?.userName[0];
        const email=fields?.email&&fields?.email[0];
        const password=fields?.password&&fields?.password[0];
        const confirmPassword=fields?.confirmPassword&& fields?.confirmPassword[0];

           const {image}=files;
           const error=[];

           console.log(userName);
        if(!userName){
            error.push('Please provide your user name');
        }
        if(!email){
            error.push('Please provide your Email');
        }
        if(email && !validator.isEmail(email)){
            error.push('Please provide valid Email');
        }
        if(!password){
            error.push('Please provide your Password');
        }
        if(!confirmPassword){
            error.push('Please provide your confirm Password');
        }
        if(password && confirmPassword && password !== confirmPassword){
            error.push("Your Password and confirm Password are not same")
        }
        if(password && password.length < 6){
            error.push('Password must be 6 character long')
        }

        if(Object.keys(files).length===0){
            error.push('Please provide user image')
        }
        if(error.length>0){
            res.status(400).json({
                error:{
                    errorMessage:error
                }
            })
        }else{
            const getImageName=files.image[0].originalFilename
             const rn=Math.floor(Math.random()*99999);
             const newImageName=rn+getImageName;
             files.image[0].originalFilename=newImageName;
             const newPath=__dirname+`/../../client/public/image/${newImageName}`;
            //  console.log(newPath);
             try{
                console.log("Hello");
                const checkUser=await User.findOne({
                    email
                })
                console.log(checkUser);
                if(checkUser){
                    res.status(404).json({
                        error:{
                            errorMessage:"Your email already exists"
                        }
                    })
                }else{
                   fs.copyFile(files.image[0].filepath,newPath,async(error)=>{
                    console.log("inside job 1");
                    console.log(error);

                    if(!error){
                        console.log("inside job 2");

                        const userCreate=await User.create({
                            userName,
                            email,
                            password:await bcrypt.hash(password,10),
                            image:files.image[0].originalFilename
                        })
                        const token = jwt.sign({
                            id : userCreate._id,
                            email: userCreate.email,
                            userName: userCreate.userName,
                            image: userCreate.image,
                            registerTime : userCreate.createdAt
                       }, process.env.SECRET,{
                            expiresIn: process.env.TOKEN_EXP
                       }); 

                       const options = { expires : new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000 )}

                       res.status(201).cookie('authToken',token, options).json({
                            successMessage : 'Your Register Successful',token
                       })
                    }else{
                        res.status(500).json({
                            error: {
                                 errorMessage : ['Interanl Server Error']
                            }
                       })
                    }
                   });
                }
                
             }catch(error){
                console.log(error);
                 res.status(500).json({
                    error:{
                        errorMessage:['Internal Server Error']
                    }
                 })
             }
            }
        })
}

module.exports.login=async(req,res,next)=>{
    const error=[];
    const {email,password}=req.body;
    if(!email){
        error.push('Please provide your Email');
    }
    if(!password){
        error.push('Please provide your Password');
    }
    if(email && !validator.isEmail(email)){
        error.push('Please provide valid Email');
    }
    if(error.length>0){
        res.status(400).json({
            error:{
                errorMessage:error
            }
        })
    }else{
      try {
        const checkUser = await User.findOne({ email: email }).select(
          "+password"
        );
        console.log(checkUser);
        if (checkUser) {
            console.log("hello");
          const matchPassword = await bcrypt.compare(
            password,
            checkUser.password
          );
          console.log("nigga");

          if (matchPassword) {
            const token = jwt.sign(
              {
                id: checkUser._id,
                email: checkUser.email,
                userName: checkUser.userName,
                image: checkUser.image,
                registerTime: checkUser.createdAt,
              },
              process.env.SECRET,
              {
                expiresIn: process.env.TOKEN_EXP,
              }
            );
            const options = {
              expires: new Date(
                Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
              ),
            };

            res.status(201).cookie("authToken", token, options).json({
              successMessage: "Your Login Successful",
              token,
            });
          } else {
            res.status(400).json({
              error: {
                errorMessage: ["Invalid password"],
              },
            });
          }
        } else {
          res.status(400).json({
            error: {
              errorMessage: ["Email not found"],
            },
          });
        }
      } catch (err) {
        res.status(404).json({
          error: {
            errorMessage: ["Internal Server error"],
          },
        });
      }
    }
}

module.exports.logout=async(req,res)=>{
  res.status(200).cookie('authToken', '').json({
    success : true
})
}