import express from 'express'
import loginUser from '../userData/login.js';
import registerUser from '../userData/register.js';
import { getUser, getUserList, getUsersByRole, updateUser, lockUser, unlockUser, deleteUser } from '../userData/user.js';
import { addRole, deleteRole } from '../userData/roles.js';
import { getRoles } from '../webData/config.js';

const router = express.Router();

//get
router.get('/getUser/:name', getUser)
router.get('/getUserList/:number?', getUserList) //get speciic number of users
router.get('/getUsersByRole/:roleName', getUsersByRole)
router.get('/getAllRoles', getRoles)

//post
router.post('/updateUser/:username', updateUser)

router.post('/addRole/:roleName', addRole)
router.post('/lockUser/:username', lockUser)
router.post('/unlockUser/:username', unlockUser)

router.post('/login', loginUser);
router.post('/register', registerUser);

//delete
router.delete('/deleteRole/:roleName', deleteRole)
router.delete('/deleteUser', deleteUser)

export default router