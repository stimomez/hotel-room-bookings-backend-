const { db, DataTypes } = require('../utils/database.util');

const Booking = db.define('booking', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  checkOut: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  huespedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { Booking };
