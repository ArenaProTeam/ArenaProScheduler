const express = require('express');
const router = express.Router();
const arenaController = require('../controllers/arenaController');

router.post('/', arenaController.createArena);
router.get('/', arenaController.getArenas);

module.exports = router;