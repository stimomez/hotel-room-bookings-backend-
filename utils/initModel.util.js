const { Room } = require('../models/rooms.model');
const { Booking } = require('../models/booking.model');
const { Huesped } = require('../models/huesped.model');

const initModels = () => {
  Room.hasOne(Booking);
  Booking.belongsTo(Room);

  Huesped.hasMany(Booking);
  Booking.belongsTo(Huesped);
};

module.exports = { initModels };
