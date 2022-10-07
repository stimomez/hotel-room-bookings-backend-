const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const { globalErrorHandler } = require('./controllers/error.controller');
const { AppError } = require('./utils/appError.util');
const { router } = require('./routes/rooms.routes');

const app = express();

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use(helmet());

app.use(compression());

app.use('/api/v1/room', router);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = { app };
