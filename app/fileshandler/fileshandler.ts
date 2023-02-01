import { dialog, ipcMain } from 'electron';
import { stat } from 'fs';
import { getAudioDurationInSeconds } from 'get-audio-duration';
var mainWindow;

export function filesHandlerSetup(window: any) {
    mainWindow = window;
}

ipcMain.on("open-files", (event, args) => {
    var resp = dialog.showOpenDialog({
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
                promises.push(getAudioDurationInSeconds(path));
            }
            Promise.all(promises).then(durations => {
                for (var i = 0; i < durations.length; i++) {
                    songs.push({path: filepaths[i], duration: durations[i]});
                }
                mainWindow.webContents.send('open-files-change', songs);
            })
        }
    });
});