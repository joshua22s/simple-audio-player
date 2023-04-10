import { dialog, ipcMain } from 'electron';
import { stat } from 'fs';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import { Logger } from '../logger/logger';
var mainWindow;
var log;


export function filesHandlerSetup(window: any, logger: Logger) {
    mainWindow = window;
    log = logger;
}

ipcMain.on("open-files", (event, args) => {
    var resp = dialog.showOpenDialog({
        filters: [{
            name: 'audio', extensions: ['mp3', 'wav']
        }],
        properties: ['openFile', 'multiSelections']
    });
    resp.then(res => {
        log.info(JSON.stringify(res));
        if (!res.canceled) {
            var filepaths = res.filePaths;
            var songs = [];
            var promises = [];
            for (let path of res.filePaths) {
                promises.push(getAudioDurationInSeconds(path));
            }
            Promise.all(promises).then(durations => {
                for (var i = 0; i < durations.length; i++) {
                    songs.push({path: filepaths[i], duration: durations[i]});
                }
                mainWindow.webContents.send('open-files-change', songs);
            }).catch(err => {
                log.error(JSON.stringify(err));
            })
        }
    });
});