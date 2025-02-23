const express = require('express');
const { addItem, getItems } = require('../controllers/inventoryController');
const router = express.Router();

router.post('/', addItem);
router.get('/', getItems);

module.exports = router;