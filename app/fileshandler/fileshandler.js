"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesHandlerSetup = void 0;
const electron_1 = require("electron");
var mainWindow;
function filesHandlerSetup(window) {
    mainWindow = window;
}
exports.filesHandlerSetup = filesHandlerSetup;
electron_1.ipcMain.on("open-files", (event, args) => {
    var resp = electron_1.dialog.showOpenDialog({
        filters: [{
                name: 'audio', extensions: ['mp3', 'wav']
            }],
        properties: ['openFile', 'multiSelections']
    });
    resp.then(res => {
        console.log(res.filePaths);
        if (!res.canceled) {
            mainWindow.webContents.send('open-files-change', res.filePaths);
        }
    });
});
//# sourceMappingURL=fileshandler.js.map