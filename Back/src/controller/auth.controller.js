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
    const validUser = await User.findOne({email});

    if(!validUser){
        return res.status(404).json("user not found");
    }
    const validPassword =  bcryptjs.compareSync(password,validUser.password);

    if(!validPassword){
        return res.status(401).json("invalid credentials");
    }

    const token = jwt.sign({id:validUser._id},"secretkey",{expiresIn:"1h"});
  

    res.status(200).json({token});
}