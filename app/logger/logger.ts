import * as log from 'electron-log';
import * as path from 'path';

export class Logger {

    constructor(mainApp: any) {
        log.transports.file.resolvePath = () => path.join(mainApp.getPath("userData"), 'logs.log');;
    }

    info(message: string) {
        log.info(message);
    }

    warn(message: string) {
        log.warn(message);
    }

    error(message: string) {
        log.error(message);
    }
}