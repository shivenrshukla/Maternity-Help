const mongoose = require('mongoose');

const consultationRequestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  roomId: String,
  doctorToken: String,
  patientToken: String,
}, { timestamps: true });

module.exports = mongoose.model('ConsultationRequest', consultationRequestSchema);
