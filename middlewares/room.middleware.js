const { Room } = require('../models/rooms.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const roomExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const room = await Room.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!room) {
    return next(new AppError('room not available ', 404));
  }

  req.room = room;

  next();
});

module.exports = { roomExist };
