import User from "../models/User.js";

export const GetAllUsers=async(req,res)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteUser=async(req,res)=>{
  try{
    const user=await User.findOneAndDelete(req.params.id)
    if(!user){
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({message:`${user.name} deleted successfuly!!`});
  }catch(err){
     res.status(500).json({message: err.message});
  }
}

export const deleteAllUsers=async(req,res)=>{
  try{
    const users=await User.deleteMany();
    if(!users){
      return res.status(404).json({message: "No users found to delete"})
    }
    res.status(200).json({message: "All users deleted successfuly!!"});
  }catch{
    res.status(500).json({message: err.message});
  }
}