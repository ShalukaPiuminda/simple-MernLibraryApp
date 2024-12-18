import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import sendEmail from "../utils/emailService.js";
// register

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Check for existing user
    const isnew_userexit = await User.findOne({ email });
    if (isnew_userexit) {
      return res.status(400).json({ message: `User ${email} already exist` });
    }
    const newuser = await User({ name, email, password, role });
    await newuser.save();

    res.status(200).json({
      message: `User ${newuser.name} is registered successfully`,
      message: newuser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login existing user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `${email} is not found!!` });
    }
    //  check password
    const is_validpassword = await user.comparePassword(password);
    if (!is_validpassword) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    res.status(200).json({ success: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Forgot password
export const forgotPassword = async (req, res) => {
 try{
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found with this email" });
  }

  // generate reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // send email
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${resetToken}`;
  const message = `You have requested a password reset.click on the link below to reset your password:\n\n${resetUrl} `;

  await sendEmail({
    to: user.email,
    subject: "password reset request",
    message,
  });
  res.status(200).json({message:'Password reset email sent successfully'});
 }catch(err){
   res.status(500).json({message:'Error sending reset email',err:err.message})
 }

};
 
// Reset Password

export const resetPassword=async(req,res)=>{
  try{
    const {token} = req.params;
    const {password}=req.body;
  //  hash the token
  const resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex');

  const user=await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
  });

  if(!user){
    return res.status(400).json({message:'Invalid or expire Token'});
  }
  //  update password and clear reset token

  user.password=password;
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;
  await user.save();

  res.status(200).json({message:'Password reset successfully'});
  }catch(err){
    res.status(500).json({message:'Error resetting password',err:err.message})
  }
  
}