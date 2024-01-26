import winston from "winston";
import { MongoDB } from "winston-mongodb";
import dotenv from 'dotenv'
dotenv.config();

class Logger {

    constructor() {
        const url = process.env.DB;

        const logConfiguration = {
            //silence logs during tests:
            silent: process.argv.indexOf("--silent") >= 0, //disable logs if --silent is in args
            level:'info',
            transports: [
                new winston.transports.MongoDB({
                    db: url,
                    dbName: "CMSBlog",
                    collection: "Logs",
                    options: { useUnifiedTopology: true },
                    includeIds: false,
                }),
            ],
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "DD-MM-YYYY HH:mm:ss",
                }),
                winston.format.align(),
                winston.format.printf(
                    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
                ),
                winston.format.json()
            ),
        };

        this.logger = winston.createLogger(logConfiguration);
    }
    _getRequestInfo(req) {
        return {
            url: req.originalUrl,
            method: req.method,
            ip: req.ip,
        };
    }
    info(message, req = null) {
        if (req) {
            const requestInfo = this._getRequestInfo(req);
            this.logger.info(message, {metadata: requestInfo});
        } else {
            this.logger.info(message);
        }
    }

    error(message, req = null) {
        if (req) {
            const requestInfo = this._getRequestInfo(req);
            this.logger.error(message, {metadata: requestInfo });
        } else {
            this.logger.error(message);
        }
    }

}

const loggerInstance = new Logger();

export default loggerInstance;