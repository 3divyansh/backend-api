const Usercontroller = require('../controllers/user');

const express = require('express');
const router = express.Router();
   const { checkAuth,checkAdmin } = require("../middleware/auth");


router.post('/create', Usercontroller.createUser);
router.get('/get-all',checkAdmin, Usercontroller.getAllUsers);
router.delete('/delete', Usercontroller.getAllUsers);
router.put('/update/:id', Usercontroller.updateUser);
router.post('/login', Usercontroller.login)






module.exports = router ;