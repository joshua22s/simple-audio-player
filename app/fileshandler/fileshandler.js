"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesHandlerSetup = void 0;
const electron_1 = require("electron");
const get_audio_duration_1 = require("get-audio-duration");
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
        if (!res.canceled) {
            var filepaths = res.filePaths;
            var songs = [];
            var promises = [];
            for (let path of res.filePaths) {
                promises.push((0, get_audio_duration_1.getAudioDurationInSeconds)(path));
            }
            Promise.all(promises).then(durations => {
                for (var i = 0; i < durations.length; i++) {
                    songs.push({ path: filepaths[i], duration: durations[i] });
                }
                mainWindow.webContents.send('open-files-change', songs);
            });
        }
    });
});
//# sourceMappingURL=fileshandler.js.map