import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandelar } from "../utils/error.js";
import Listing from '../models/listing.Model.js';

export const test = (request,response)=>{
    response.json({
        message:"Api route is working"
    })
}

export const updateUser = async (request, response, next) => {
    if (request.user.id !== request.params.id)
      return next(errorHandelar(401, 'You can only update your own account!'));
    try {
      if (request.body.password) {
        request.body.password = bcryptjs.hashSync(request.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        {
          $set: {
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
            avatar: request.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc; 
  
      response.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

export const deletUser = async(request, response, next)=>{
    if (request.user.id !== request.params.id)
    return next (errorHandelar(401,'You can only delete youuur own account !'));
    try{
        await User.findByIdAndDelete
        (request.params.id);
        response.clearCookie('access_token');
        response.status(200).json('User has been deleted!');


      }catch(error){
        next(error)
      }
    

  }


export const getUserListings =async (request, response, next)  =>{


  if (request.user.id === request.params.id){
    try{
      const listings = await Listing.find({userRef: request.params.id});
      response.status(200).json(listings);

    }catch(error){
      next(error)
    }

  }else{
    return next (errorHandelar(401,"You can only view your own listings"))
  }
  }


  export const getUser =async(req,res,next)=>{

    try {
      const user =await User.findById(req.params.id);
      if (!user) return next(errorHandelar(404,"User not found !"));
      const {password:pass , ...rest}=user._doc;
      res.status(200).json(rest);
      
    } catch (error) {
      next(error)
    }

  }