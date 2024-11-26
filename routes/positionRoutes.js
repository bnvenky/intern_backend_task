const express = require('express');
const { createPosition, getPositions, getPositionsId, updatePosition} = require('../controllers/positionController');
const router = express.Router();

router.post('/positions', createPosition);
router.get('/positions', getPositions);
router.get('/positions/:id', getPositionsId);
router.put('/positions/:id', updatePosition);  
  

module.exports = router;

