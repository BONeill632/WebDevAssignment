const express = require('express');
const controller = require('../controllers/emotionController');
const router = express.Router();

// GETS
router.get('/emotions/:userid', controller.index);
router.get('/emotion/:id', controller.selectEmotion);
router.get('/timeline/:userid', controller.timeline);

// POSTS
router.post('/emotions/new', controller.newEmotion);

//PUTS
router.patch('/emotion/:id', controller.updateEmotion);

// DELETES
router.delete('/emotions/:id', controller.deleteEmotion);

module.exports = router;