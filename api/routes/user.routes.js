import express from 'express';
import { test, updateUser } from '../controller/user.controller.js';
import { veryToken } from '../utils/VeryFiyUser.js';

const router =express.Router();
router.get ('/test', test );
router.post('/update/:id',veryToken,updateUser);

export default router;