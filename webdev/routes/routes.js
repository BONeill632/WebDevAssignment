const express = require('express');
const controller = require('./../controllers/crudcontroller');
const router = express.Router();

// GET METHODS
router.get('/index', controller.index);
router.get('/', controller.index);
router.get('/newEmotion', controller.getNewEmotion);
router.get('/timeline', controller.timeline);
router.get('/editEmotion/:id', controller.selectEmotion);
router.get('/login', controller.getLogin);
router.get('/logout', controller.getLogout);
router.get('/createAccount', controller.getCreateAccount);
router.get('/about', controller.about);
router.get('/contact', controller.contact);
router.get('/userDetails', controller.userDetails);

// POST METHODS
router.post('/newEmotion', controller.newEmotion);
router.post('/editEmotion/:id', controller.updateEmotion);
router.post('/delEmotion/:id', controller.deleteEmotion);
router.post('/login', controller.postLogin);
router.post('/createAccount', controller.createAccount);
router.post('/userDetails', controller.updateUserDetails);
router.post('/deleteAccount', controller.postDeleteAccount);

module.exports = router;