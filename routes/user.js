const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/add-user',userController.postAddUser);

router.get('/user/get-users',userController.getUsers);

router.delete('/user/delete-user/:id',userController.deleteUser);

module.exports=router;