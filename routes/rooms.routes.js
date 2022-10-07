const express = require('express');
const {
  getAllRooms,
  roomReservation,
  createRooms,
  checkIn,
  checkOut,
} = require('../controllers/rooms.controller');
const { bookingExist } = require('../middlewares/booking.middleware');
const { identificationExist } = require('../middlewares/huesped.middleware');
const { roomExist } = require('../middlewares/room.middleware');

const roomRouter = express.Router();

roomRouter.get('/', getAllRooms);

roomRouter.post('/', createRooms);
roomRouter.post(
  '/bookings/:id',
  roomExist,
  identificationExist,
  roomReservation
);

roomRouter.patch('/bookings/check-in/:id', bookingExist, checkIn);
roomRouter.patch('/bookings/check-out/:id', bookingExist, checkOut);

module.exports = { router: roomRouter };
