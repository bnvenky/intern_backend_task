const express = require('express');
const { createCandidates, getCandidates, getUniqueCandidate, updateCandidates} = require('../controllers/candidatesController');
const multer = require('multer');
const path = require('path')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  
    }
  })
  
const upload = multer({
    storage: storage
  })
  


router.post('/candidates', upload.single('avatar'), createCandidates);
router.get('/candidates', getCandidates);
router.get('/candidates/:id', getUniqueCandidate);
router.put('/candidates/:id', upload.single('avatar'), updateCandidates);


module.exports = router;