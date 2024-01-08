import express from 'express'
import * as userMethods from '../user/'

const router = express.Router();

router.get('/hasAdminAccess', userController.getUsersWithAdminAccess);//todo
router.get('/findUser/:username', userController.getUser);//todo

router.post('/lockUser/:username', userController.lockUser);//todo
router.post('/unlockUser/:username', userController.unlockUser);//todo
router.get('/login', userMethods.loginUser);
router.post('/register', userMethods.registerUser);