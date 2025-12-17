import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import sendEmail from "../utils/sendmail.js";
import { User } from "../model/auth.model.js";
import jwt from "jsonwebtoken"



const generateToken = async (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });

  return token;
};


const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    throw new ApiError(400, "Password must be at least 6 characters and contain 1 uppercase letter, 1 number, and 1 special character")
  }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please enter a valid email address");
  }

    //   user alredy exist
    const user= await User.findOne({email})

    if(user){
      throw new ApiError(400, "Email already exist! please login ")
    }

    
    await User.create({fullName, email, password})

    await sendEmail(email);

    console.log("user registered successfully!", {
      fullName,
      email
    })
    
    res.status(201).json({
        success:true,
        message:"user Registered successfully"
    });

});

const loginUser = asyncHandler(async (req, res) => {
  const {email, password}=req.body 
  if(!email || !password){
    throw new ApiError(400, "All fields are required")
  }

  const existUser=await User.findOne({email})

  if(!existUser){
    throw new ApiError(400, "email is not exist! please register first ")
  }

  const isMatch=await existUser.isPasswordCorrect(password);

  if(!isMatch){
    throw new ApiError(401, "Password is Invalid!")
  }

  const token = await generateToken(existUser._id, res);


  return res.status(201).json({
    success:true,
    message:"Login successfully!",
    token, // optional (cookie already set)
    user: {
      id: existUser._id,
      email: existUser.email
    }
  })



});

const logoutUser = asyncHandler(async (req, res) => {});

const updatePassword = asyncHandler(async (req, res) => {



});



export { registerUser, loginUser, logoutUser, updatePassword };
