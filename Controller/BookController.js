import Book from "../models/Book.js";

export const CreateBook=async(req,res)=>{
  try{
    const newBook=new Book(req.body);
    await newBook.save();
    res.status(201).json({success:`${newBook.title} created successfully` ,message:newBook});
  }catch(err){
     res.status(500).json({error:err.message});
  }
}

export const GetAllBooks=async(req,res)=>{
  try{
    const books=await Book.find();
    res.status(200).json({success:` total no of books:${books.length} `,data:books});
  }catch(err){
    res.status(500).json({error:err.message});
  }
}
// get one book

export const GetSingleBook=async(req,res)=>{
   try{
    const onebook=await Book.findById(req.params.id);
    res.status(200).json({success:onebook});
   }catch(err){
      res.status(404).json({error:`No book found`,err:err.message});
   }
}

// update book
export const  UpdateBook=async(req,res)=>{
  try{
    const newbook=await Book.findOneAndUpdate(req.params.id,req.body,{new:true,});
  }
  catch(err){
    res.status(404).json({error:err.message});
  }

}

// delete book

export const DeleteBook=async(req,res)=>{
  try{
    const deletebook=await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({success:` ${deletebook.title} is deleted successfully`})
  }catch(err){
    res.status(404).json({error:err.message});
  }
}