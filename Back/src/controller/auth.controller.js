import User from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../../utils/error.js";
export const signup = async (req, res,next) => {
    const {username,email,password} = req.body;
    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
      ) {
        next(errorHandler(400, 'All fields are required'));
      
    }
    const hashedPassword = bcryptjs.hashSync(password,10); 

    const user = new User({username,email,password:hashedPassword});
    try{
        await user.save();
        res.status(201).json("user created successfully");
        
    }
    catch(error){   
       next(error);            
    }
}

export const signin = async (req, res,next) => {
     
    const {email,password} = req.body;

    if (
        
        !email ||
        !password ||
        email === '' ||
        password === ''
      ) {
       return next(errorHandler(400, 'All fields are required'));
      
    }
    
    try{
    const validUser = await User.findOne({email});
    

    if(!validUser){
        return next(errorHandler(401,"user not found"));
    }
    const validPassword =  bcryptjs.compareSync(password,validUser.password);

    if(!validPassword){
        return next(errorHandler(401,"invalid password"));}

    const token = jwt.sign({id:validUser._id},"secretkey");
  
    const { password: pass, ...rest } = validUser._doc;

    res
    .status(200)
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .json(rest);}
catch(error){
    next(error);
}
}