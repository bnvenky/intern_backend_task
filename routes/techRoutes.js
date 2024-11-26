const express = require('express');
const { createTech, getTech, getSkillsByTechnologyId } = require('../controllers/techController');

const router = express.Router();

router.post('/tech', createTech);
router.get('/tech', getTech);
router.get('/tech/:id/skills', getSkillsByTechnologyId); // New route

module.exports = router;
