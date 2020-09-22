const util = require('util');
const winston = require('winston');
require('winston-daily-rotate-file');

var logger;

function formatArgs(args) {
  return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

var transport = new winston.transports.DailyRotateFile({
  filename: './logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
  ),
});

exports.initLogger = () => {
  logger = winston.createLogger({
    transports: [transport],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.simple()
        ),
      })
    );
  }

  console.log = function () {
    logger.info.apply(logger, formatArgs(arguments));
  };
  console.info = function () {
    logger.info.apply(logger, formatArgs(arguments));
  };
  console.warn = function () {
    logger.warn.apply(logger, formatArgs(arguments));
  };
  console.error = function () {
    logger.error.apply(logger, formatArgs(arguments));
  };
  console.debug = function () {
    logger.debug.apply(logger, formatArgs(arguments));
  };
};

exports.middleware = (req, res, next) => {
  console.info(req.method, req.url, res.statusCode);
  next();
};
