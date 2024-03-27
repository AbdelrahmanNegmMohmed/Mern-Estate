import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandelar } from "../utils/error.js";

export const test = (request,response)=>{
    response.json({
        message:"Api route is working"
    })
}

/* export const updateUser  = async(requestuest, responseponse, next)=>{
    if (requestuest.user.id !== requestuest.params.id)
    return next(errorHandelar(401,"you can only update your account!"))
    try {
        
        if (requestuest.body.password){
            requestuest.body.password = bcryptjs.hashSync(requestuest.body.password, 10)
        
        }

        const updateUser = await User.findByIdAndUpdate(
            requestuest.params.id,
            {
            $set:{
                username: requestuest.body.username,
                email:requestuest.body.emaile,
                password:requestuest.body.password,
                avatar:requestuest.body.avatar,
            
            }
        },{new:true})

        const {password, ...responset}= updateUser._doc;

        responseponse.status(200).json(responset);
    } catch (error) {
        next (error)
        
    }

}; */
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