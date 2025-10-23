import winston from 'winston';
import path from 'path';

// Define log levels and colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston about custom colors
winston.addColors(logColors);

// Define log format
const logFormat = winston.format.combine(
  // Add timestamp
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
  // Add colors to console output
  winston.format.colorize({ all: true }),
  // Define format template
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define which transports the logger will use
const transports = [
  // Console transport
  new winston.transports.Console({
    format: logFormat,
  }),
  // File transport for errors
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
  // File transport for all logs
  new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
];

// Create the logger
const logger = winston.createLogger({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === 'development' ? 'debug' : 'warn'),
  levels: logLevels,
  transports,
});

export default logger;
