import express from 'express';
import { veryToken } from '../utils/VeryFiyUser.js';
import { createListing,deleteListing } from '../controller/listing.controller.js';

const router = express.Router();

router.post('/create',veryToken, createListing);
router.delete('/delete/:id',veryToken,deleteListing)

export default router;