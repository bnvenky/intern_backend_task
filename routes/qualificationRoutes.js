const express = require('express');
const { createQualification, getQualification, getQualificationById } = require('../controllers/qualificationController');

const router = express.Router();

router.post('/qualification', createQualification);
router.get('/qualification', getQualification);
router.post('/qualification/:id', getQualificationById);

module.exports = router;