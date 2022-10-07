const { db, DataTypes } = require('../utils/database.util');

const Huesped = db.define('huesped', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificationCardNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // email: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique
  // },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = { Huesped };
