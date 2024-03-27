import express from 'express';
import { test, updateUser,deletUser } from '../controller/user.controller.js';
import { veryToken } from '../utils/VeryFiyUser.js';


const router =express.Router();
router.get ('/test', test );
router.post('/update/:id',veryToken,updateUser);
router.delete('/delete/:id',veryToken,deletUser);

export default router;