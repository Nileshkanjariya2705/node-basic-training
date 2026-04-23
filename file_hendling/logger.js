import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'debug', // Show all logs from debug and above
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new transports.Console()
  ]
});

export default logger;