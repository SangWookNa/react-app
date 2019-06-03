import appRoot from 'app-root-path';
import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'debug',
    filename: `${appRoot}/server/logs/app-%DATE%.log`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
  },
};

// your centralized logger object
let logger = winston.createLogger({

  transports: [
    new (winston.transports.Console)(options.console),
    new (winston.transports.DailyRotateFile)(options.file),
  ],
  exitOnError: false, // do not exit on handled exceptions

});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;