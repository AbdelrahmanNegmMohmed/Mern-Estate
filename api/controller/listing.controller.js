import Listing from '../models/listing.Model.js';
import { errorHandelar } from '../utils/error.js';
export const createListing = async (request, response, next) => {
  try {
    const listing = await Listing.create(request.body);
    return response.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteListing = async (request, response, next)=>{
  const listing = await Listing.findById(request.params.id)

  if (!listing){
    return next(errorHandelar(404,'Listing not found'))
  }
  if (request.user.id !== listing.userRef){
    return next(errorHandelar(401,"You can only delet your own listings!"))

  }
  try {
    await Listing.findByIdAndDelete(request.params.id)
    response.status(200).json('Listing has been deleted!')
  } catch (error) {
    next(error)
  }

}

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandelar(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandelar(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
export const getListing = async (req, res, next)=>{
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
      return next(errorHandelar(400,"Listing not found"))
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error)
  }

}