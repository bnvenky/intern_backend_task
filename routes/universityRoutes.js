const express = require('express');
const { createUniversity, getUniversity, getUniversityById} = require('../controllers/universityController');

const router = express.Router();

router.post('/university', createUniversity);
router.get('/university', getUniversity);
router.get('/university/:id', getUniversityById);

module.exports = router;