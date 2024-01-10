import express from 'express'
import loginUser from '../userData/login.js';
import registerUser from '../userData/register.js';

const router = express.Router();

// router.get('/hasAdminAccess', userController.getUsersWithAdminAccess);//todo
// router.get('/findUser/:username', userController.getUser);//todo

// router.post('/updateUser/:username', userController.lockUser);//todo
router.post('/login', loginUser);
router.post('/register', registerUser);

export default router