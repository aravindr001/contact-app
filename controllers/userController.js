const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
var dotenv =require('dotenv').config()


//@desc Register a user 
//@route POST users/register
//@access public
const registerUser = asyncHandler(async (req, res, next)=> {
    const {username, email, password}= req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("all feilds are mandatory")
    }
    const userAvailable = await User.findOne({email});
    // console.log(userAvailable);
    if (userAvailable) {
      res.status(400)
      throw new Error("User already exists");
    }
    
    //Hash password
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })
    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email})
    }
    res.json({message:"register the user"})
  }
);

//@desc Show user details
//@route POST users/current
//@access private
const currentUser = asyncHandler(async (req, res, next)=> {
    res.json(req.user)
  }
);

//@desc Login to the user
//@route POST users/login 
//@access public
const loginUser = asyncHandler(async (req, res, next)=> {
    const {email,password} = req.body 
    if(!email || !password){
      res.status(400);  
      throw new Error("all feilds are manditory")
    }
    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign({
        user:{
          username: user.username,
          email : user.email,
          id: user.id,
        },
      },process.env.ACCESS_TOKEN_SECERT,
      { expiresIn : "20m"}
      )
      res.status(201).json({accessToken})
    }else{
      res.status(401)
      throw new Error("Email or password not valid")
    }
  }
);



module.exports = {
    registerUser,
    currentUser,
    loginUser
}