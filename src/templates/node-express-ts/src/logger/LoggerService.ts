/* eslint-disable @typescript-eslint/ban-types */
import { createLogger, format, transports, Logger } from 'winston';

class LoggerService {
  log_data: Object;

  logger: Logger;

  constructor(private readonly route: any) {
    this.log_data = null;
    this.route = route;

    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf((info) => {
          let message = `${info.timestamp} ${info.level.toUpperCase()}: ${
            info.message
          } route: ${route}.log`;

          message = info.obj
            ? `${message}data:${JSON.stringify(info.obj)} | `
            : message;

          message = this.log_data
            ? `${message}log_data:${JSON.stringify(this.log_data)} | `
            : message;

          return message;
        })
      ),
      transports: [
        new transports.File({
          filename: `./logs/${route}.log`,
          maxsize: 5242880,
          maxFiles: 5,
        }),
        new transports.Console(),
      ],
    });
  }

  setLogData(log_data: Object) {
    this.log_data = log_data;
  }

  async info(message: string, object?: Object) {
    this.logger.log('info', message, { object });
  }

  async debug(message: string, object?: Object) {
    this.logger.log('debug', message, { object });
  }

  async error(message: string, object?: Object) {
    this.logger.log('error', message, { object });
  }
}

export { LoggerService };
