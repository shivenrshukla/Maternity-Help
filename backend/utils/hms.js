// utils/hms.js
const { HMSRoomService, HMSPeerTokenService } = require('@100mslive/server-sdk');

const roomService = new HMSRoomService({
  accessKey: process.env.HMS_ACCESS_KEY,
  secret: process.env.HMS_SECRET,
});

const tokenService = new HMSPeerTokenService({
  accessKey: process.env.HMS_ACCESS_KEY,
  secret: process.env.HMS_SECRET,
});

async function createRoomAndTokens(patientName, doctorName) {
  const room = await roomService.create({ name: `room-${Date.now()}` });

  const doctorToken = await tokenService.getAuthToken({
    user_id: doctorName,
    role: 'doctor',
    room_id: room.id,
  });

  const patientToken = await tokenService.getAuthToken({
    user_id: patientName,
    role: 'patient',
    room_id: room.id,
  });

  return { roomId: room.id, doctorToken, patientToken };
}

module.exports = { createRoomAndTokens };
