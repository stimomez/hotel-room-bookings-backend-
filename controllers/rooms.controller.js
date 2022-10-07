const { catchAsync } = require('../utils/catchAsync.util');
const { Room } = require('../models/rooms.model');
const { Huesped } = require('../models/huesped.model');
const { Booking } = require('../models/booking.model');
const { where } = require('sequelize');
const { AppError } = require('../utils/appError.util');

const getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.findAll({
    where: { status: 'active' },
  });

  return res.status(200).json({
    status: 'success',
    rooms,
  });
});

const createRooms = catchAsync(async (req, res, next) => {
  const { name, peopleAdmitted, price, futureBooking } = req.body;

  const roomCode = Math.floor(Math.random() * (10000000 - 100000) + 5000000);
  const newRoom = await Room.create({
    name,
    peopleAdmitted,
    price,
    futureBooking,
    roomCode,
  });
  return res.status(201).json({
    status: 'success',
    newRoom,
  });
});

const roomReservation = catchAsync(async (req, res, next) => {
  const { name, lastName, identificationCardNumber, telephone } = req.body;

  let { huesped, room } = req;

  if (!huesped) {
    huesped = await Huesped.create({
      name,
      lastName,
      identificationCardNumber,
      telephone,
    });
  }

  const newBooking = await Booking.create({
    roomId: room.id,
    huespedId: huesped.id,
  });

  await room.update({ status: 'occupied' });

  return res.status(201).json({
    status: 'success',
    newBooking,
  });
});

const checkIn = catchAsync(async (req, res, next) => {
  const { booking } = req;
  const checkIn = new Date();
  await booking.update({ checkIn });
  return res.status(204).json({
    status: 'success',
  });
});

const checkOut = catchAsync(async (req, res, next) => {
  const { booking } = req;
  if (booking.checkIn == null) {
    return next(
      new AppError('You cannot check-out without fist check-in', 404)
    );
  }
  const checkOut = new Date();
  await booking.update({ checkOut, checkIn: null, status: 'disabled' });

  const room = await Room.findOne({ where: { id: booking.roomId } });
  await room.update({ status: 'active' });
  return res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  getAllRooms,
  createRooms,
  roomReservation,
  checkIn,
  checkOut,
};
