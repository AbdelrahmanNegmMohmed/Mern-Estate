import express from 'express';
import { veryToken } from '../utils/VeryFiyUser.js';
import { createListing,deleteListing,updateListing,getListing,getListings } from '../controller/listing.controller.js';

const router = express.Router();

router.post('/create',veryToken, createListing);
router.delete('/delete/:id',veryToken,deleteListing);
router.post('/update/:id', veryToken, updateListing);
router.get('/get/:id',getListing);
router.get('/get',getListings)

export default router;