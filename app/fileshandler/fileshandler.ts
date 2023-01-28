import { dialog, ipcMain } from 'electron';

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
            mainWindow.webContents.send('open-files-change', res.filePaths);
        }
    });
})