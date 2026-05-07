const express = require('express');
const router = express.Router();
const { registerWorker, getWorker, updateSkills, updateAvailability } = require('../controllers/worker.controller');

router.post('/register', registerWorker);
router.get('/:id', getWorker);
router.put('/:id/skills', updateSkills);
router.put('/:id/availability', updateAvailability);

module.exports = router;