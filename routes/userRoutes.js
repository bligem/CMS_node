import express from 'express'
import * as userMethods from '../userData'

const router = express.Router();

router.get('/hasAdminAccess', userController.getUsersWithAdminAccess);//todo
router.get('/findUser/:username', userController.getUser);//todo

router.post('/updateUser/:username', userController.lockUser);//todo
router.get('/login', userMethods.loginUser);
router.post('/register', userMethods.registerUser);