import express from 'express';
import { veryToken } from '../utils/VeryFiyUser.js';
import { createListing } from '../controller/listing.controller.js';

const router = express.Router();

router.post('/create',veryToken, createListing);

export default router;