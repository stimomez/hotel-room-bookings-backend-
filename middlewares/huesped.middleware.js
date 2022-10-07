const { Huesped } = require('../models/huesped.model');
const { catchAsync } = require('../utils/catchAsync.util');

const identificationExist = catchAsync(async (req, res, next) => {
  const { identificationCardNumber } = req.body;
 
  const huesped = await Huesped.findOne({
    where: {
      identificationCardNumber,
      status: 'active',
    },
  });

  req.huesped = huesped;

  next();
});

module.exports = { identificationExist };
