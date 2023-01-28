import { setdbPath, executeScript, executeQuery } from 'sqlite-electron';

const createScript =
    `CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, created INTEGER);`;

export function dbSetup() {
    setdbPath('db.sqlite').then(() => {
        console.log("set database path");
    }).catch(err => {
        console.log(err);
    });
    executeQuery("CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, created INTEGER)").then(() => {

    });
    // executeScript('CREATE TABLE IF NOT EXISTS sqlite_main (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,NAME TEXT NOT NULL,AGE INT NOT NULL,ADDRESS CHAR(50) NOT NULL,SALARY REAL NOT NULL);').then(() => {
    //     console.log("hej");
    // });

    // executeScript(createScript).then(() => {
    //     console.log("created db structure");
    // });
}


