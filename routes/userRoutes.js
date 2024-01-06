import express from 'express'

const router = express.Router();

router.get('/login', userController.loginUser);
router.get('/register', userController.registerUser);
router.get('/hasAdminAccess', userController.getUsersWithAdminAccess);
router.get('/findUser/:username', userController.getUser);
router.get('/lockUser/:username', userController.lockUser);
router.get('/unlockUser/:username', userController.unlockUser);