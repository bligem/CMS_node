import express from 'express'
import User from '../UserController/user.js';
import Role from '../UserController/roles.js';
import Config from '../WebController/config.js';

const router = express.Router();

//get
router.get('/getUser/:name', User.getUser)
router.get('/getUserList/:number?', User.getUserList) //get speciic number of users
router.get('/getUsersByRole/:roleName', User.getUsersByRole)
router.get('/getAllRoles', Config.getRoles)

//post
router.post('/updateUser/:username', User.updateUser)

router.post('/addRole/:roleName', Role.addRole)
router.post('/lockUser/:username', User.lockUser)
router.post('/unlockUser/:username', User.unlockUser)

router.post('/login', User.loginUser);
router.post('/register', User.registerUser);

//delete
router.delete('/deleteRole/:roleName', Role.deleteRole)
router.delete('/deleteUser', User.deleteUser)

export default router