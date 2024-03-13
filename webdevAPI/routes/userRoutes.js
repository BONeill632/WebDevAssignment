const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

// GETS
router.get('/users/:userid', controller.userDetails);

// POSTS
router.post('/users', controller.postLogin);
router.post('/users/new', controller.createAccount);

// DELETED
router.delete('/users/:userid', controller.deleteAccount);

// PATCHES
router.patch('/updateUser', controller.updateUserDetails);

module.exports = router;
