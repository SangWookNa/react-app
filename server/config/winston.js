import appRoot from 'app-root-path';
import winston from 'winston';
import 'winston-mongodb';


// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/server/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
//winston.add(new winston.transports.MongoDB(options));

// your centralized logger object
let logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)(options.console),
    new (winston.transports.File)(options.file),
    new(winston.transports.MongoDB)({
      db : 'mongodb://localhost:27017/invitation',
  })
  ],
  exitOnError: false, // do not exit on handled exceptions
  
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;