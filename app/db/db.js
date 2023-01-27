"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const sqlite_electron_1 = require("sqlite-electron");
const createScript = `CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, created INTEGER);`;
function setup() {
    (0, sqlite_electron_1.setdbPath)('db.sqlite').then(() => {
        console.log("set database path");
    }).catch(err => {
        console.log(err);
    });
    (0, sqlite_electron_1.executeQuery)("CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, created INTEGER)").then(() => {
    });
    // executeScript('CREATE TABLE IF NOT EXISTS sqlite_main (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,NAME TEXT NOT NULL,AGE INT NOT NULL,ADDRESS CHAR(50) NOT NULL,SALARY REAL NOT NULL);').then(() => {
    //     console.log("hej");
    // });
    // executeScript(createScript).then(() => {
    //     console.log("created db structure");
    // });
}
exports.setup = setup;
//# sourceMappingURL=db.js.map