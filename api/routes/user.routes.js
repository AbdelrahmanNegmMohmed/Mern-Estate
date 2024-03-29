import express from 'express';
import { test, updateUser,deletUser,getUserListings,getUser} from '../controller/user.controller.js';
import { veryToken } from '../utils/VeryFiyUser.js';


const router =express.Router();
router.get ('/test', test );
router.post('/update/:id',veryToken,updateUser);
router.delete('/delete/:id',veryToken,deletUser);
router.get('/listings/:id',veryToken,getUserListings);
router.get('/:id',veryToken,getUser)

export default router;