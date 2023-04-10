"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const log = require("electron-log");
const path = require("path");
class Logger {
    constructor(mainApp) {
        log.transports.file.resolvePath = () => path.join(mainApp.getPath("userData"), 'logs.log');
        ;
    }
    info(message) {
        log.info(message);
    }
    warn(message) {
        log.warn(message);
    }
    error(message) {
        log.error(message);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map