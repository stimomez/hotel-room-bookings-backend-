const { Booking } = require('../models/booking.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const bookingExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const booking = await Booking.findOne({
    where: { id, status: 'active' },
  });

  if (!booking) {
    next(new AppError('Booking  not available ', 404));
  }

  req.booking = booking;

  next();
});

module.exports = { bookingExist };
