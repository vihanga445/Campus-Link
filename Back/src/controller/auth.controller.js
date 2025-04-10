import User from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../../utils/error.js";
import e from "express";

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

  const token = jwt.sign({id:validUser._id,isAdmin:validUser.isAdmin},"secretkey");
  
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
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, "secretkey");
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id , isAdmin:newUser.isAdmin }, "secretkey");
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

        // import User from "../model/user.js";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { errorHandler } from "../../utils/error.js";
// import dotenv from "dotenv";

// dotenv.config();

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;

//   // Ensure all fields are provided
//   if (!username || !email || !password) {
//     return next(errorHandler(400, "All fields are required"));
//   }

//   // Hash the password
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const user = new User({ username, email, password: hashedPassword });

//   try {
//     // Save the user to the database
//     await user.save();

//     // Generate a JWT token after successful sign-up
//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     const { password: pass, ...rest } = user._doc;

//     // Send the response with the token
//     res
//       .status(201)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json({
//         message: "User created successfully",
//         user: rest, // Send user data excluding password
//       });
//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;

//   // Ensure all fields are provided
//   if (!email || !password) {
//     return next(errorHandler(400, "All fields are required"));
//   }

//   try {
//     // Find the user by email
//     const validUser = await User.findOne({ email });

//     if (!validUser) {
//       return next(errorHandler(401, "User not found"));
//     }

//     // Validate the password
//     const validPassword = bcryptjs.compareSync(password, validUser.password);

//     if (!validPassword) {
//       return next(errorHandler(401, "Invalid password"));
//     }

//     // Generate a JWT token after successful sign-in
//     const token = jwt.sign(
//       { id: validUser._id, isAdmin: validUser.isAdmin },
//       process.env.JWT_SECRET
//     );

//     // Remove the password field from the user object
//     const { password: pass, ...rest } = validUser._doc;

//     // Send the response with the token and user data
//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const google = async (req, res, next) => {
//   const { email, name, googlePhotoUrl } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     // If the user exists, generate and send the token
//     if (user) {
//       const token = jwt.sign(
//         { id: user._id, isAdmin: user.isAdmin },
//         process.env.JWT_SECRET
//       );
//       const { password, ...rest } = user._doc;

//       return res
//         .status(200)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     }

//     // If the user doesn't exist, create a new one
//     const generatedPassword =
//       Math.random().toString(36).slice(-8) +
//       Math.random().toString(36).slice(-8);
//     const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

//     let username =
//       name.toLowerCase().replace(/\s+/g, "") +
//       Math.random().toString(9).slice(-4);

//     while (await User.exists({ username })) {
//       username =
//         name.toLowerCase().replace(/\s+/g, "") +
//         Math.random().toString(9).slice(-4);
//     }

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       profilePicture: googlePhotoUrl,
//     });

//     await newUser.save();

//     // Generate JWT token for the new user
//     const token = jwt.sign(
//       { id: newUser._id, isAdmin: newUser.isAdmin },
//       process.env.JWT_SECRET
//     );

//     const { password, ...rest } = newUser._doc;

//     // Send the response with the token and user data
//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
