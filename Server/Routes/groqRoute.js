const express = require('express');
const { groqChat,processVoiceCommand } = require('../controllers/GROQcontroller');
const router = express.Router();

router.post('/chat', groqChat);
router.post('/voice-command',processVoiceCommand);
module.exports = router;
