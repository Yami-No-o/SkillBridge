const express = require('express');
const router = express.Router();
const { postJob, getMatches, getTeam, bookJob } = require('../controllers/job.controller');

router.post('/post', postJob);
router.get('/:id/matches', getMatches);
router.post('/:id/team', getTeam);
router.put('/:id/book', bookJob);

module.exports = router;