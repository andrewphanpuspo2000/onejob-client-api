import express from "express";
import multer from "multer";
import { addCompanyLogo } from "../aws-config/submitFIle.js";
import { findCompanyIdAndUpdate } from "../companyDbModel/companyQueries.js";
import { updateTaskMany } from "../taskModel/taskQueries.js";
import mongoose from "mongoose";
const router= express.Router();

const upload= multer({storage:multer.memoryStorage()});

router.post("/addlogo",upload.single("logo"),async(req,res,next)=>{
    const {_id}= req.body;
 try{
 if(req?.file){
   const {Location}= await addCompanyLogo(req.file);
   if(Location!==undefined){
     const result= await findCompanyIdAndUpdate(_id,{logo:Location});
      const updateTaskLogo= await updateTaskMany({ companyId:new mongoose.Types.ObjectId(_id)}, {logo:Location});
       console.log(updateTaskLogo);
     return result?._id!==undefined? res.json({
        status:"success",
        message:"Logo has been updated"
     }):res.json({
        status:"error",
        message:"Logo can not be updated",
     });
   }
 }
 }catch(error){
    next(error);
 }
});

export default router;