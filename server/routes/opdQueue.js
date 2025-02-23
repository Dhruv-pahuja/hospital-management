const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/opdQueueController');
const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAppointments);

module.exports = router;