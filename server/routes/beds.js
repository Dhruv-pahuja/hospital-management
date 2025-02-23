const express = require('express');
const { addBed, getBeds } = require('../controllers/bedController');
const router = express.Router();

router.post('/', addBed);
router.get('/', getBeds);

module.exports = router;