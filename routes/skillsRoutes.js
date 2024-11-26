const express = require('express');
const { createSkill, getSkills, getSkillsById} = require('../controllers/skillsController');

const router = express.Router();

router.post('/skills', createSkill);
router.get('/skills', getSkills);
router.get('/skills/:id', getSkillsById);

module.exports = router;
