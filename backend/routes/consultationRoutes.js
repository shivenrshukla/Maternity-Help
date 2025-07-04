// routes/consultationRoutes.js
const express = require('express');
const router = express.Router();
const Consultation = require('../models/consultationRequest');
const { createRoomAndTokens } = require('../utils/hms');

router.post('/accept', async (req, res) => {
  const { consultationId, doctorName, patientName } = req.body;

  try {
    const { roomId, doctorToken, patientToken } = await createRoomAndTokens(patientName, doctorName);

    const updated = await Consultation.findByIdAndUpdate(consultationId, {
      status: 'accepted',
      roomId,
      doctorToken,
      patientToken,
    }, { new: true });

    res.json({ success: true, consultation: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Room creation failed" });
  }
});

module.exports = router;
