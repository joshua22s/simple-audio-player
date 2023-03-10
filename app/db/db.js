"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSetup = void 0;
const electron_1 = require("electron");
const sqlite3_1 = require("sqlite3");
const uuid_1 = require("uuid");
const playlist_1 = require("../../src/app/models/playlist");
const fs_1 = require("fs");
const song_1 = require("../../src/app/models/song");
var mainWindow;
const db = new sqlite3_1.Database('db.sqlite');
function dbSetup(window) {
    mainWindow = window;
    db.exec((0, fs_1.readFileSync)(`${__dirname}/script.sql`).toString());
}
exports.dbSetup = dbSetup;
electron_1.ipcMain.on("config-get", (event, args) => {
    db.get('SELECT * FROM app_config LIMIT 1', (err, row) => {
        mainWindow.webContents.send("config-get-send", row);
    });
});
electron_1.ipcMain.on("playlist-get", (event, args) => {
    db.get(`SELECT * FROM playlist WHERE id = ?`, [args], (err, row) => {
        getPlaylistSongs(args).then(songs => {
            var playlist = convertRowToPlaylist(row);
            playlist.songs = songs;
            mainWindow.webContents.send("playlist-get-send", playlist);
        });
    });
});
function getPlaylistSongs(playlistId) {
    return new Promise((resolve, reject) => {
        var songs = [];
        db.each(`SELECT * FROM song WHERE playlistId = ?`, [playlistId], (err, row) => {
            songs.push(convertRowToSong(row));
        }, (err, count) => {
            resolve(songs);
        });
    });
}
electron_1.ipcMain.on("playlist-get-all", (event, args) => {
    var promises = [];
    var playlists = [];
    db.each("SELECT * FROM playlist", (err, row) => {
        // console.log("hello");
        // console.log(row);
        // promises.push(new Promise((res, rej) => {
        //     res(convertRowToPlaylist(row));
        // }));
        playlists.push(convertRowToPlaylist(row));
    }, (err, count) => {
        // console.log(playlists);
        mainWindow.webContents.send('playlist-get-all-send', playlists);
    });
    // Promise.all(promises).then(playlists => {
    //     console.log("all playlists");
    //     console.log(playlists);
    //     mainWindow.webContents.send('playlist-get-all-send', playlists);
    // })
});
electron_1.ipcMain.on("playlist-create", (event, args) => {
    var name = args;
    var newId = (0, uuid_1.v4)().toString();
    var newDate = new Date().getTime();
    const statement = db.prepare("INSERT INTO playlist(id, name, created) VALUES(?,?,?)");
    statement.run([newId, name, newDate], (resp, err) => {
        db.get(`SELECT * FROM playlist WHERE id = ?`, [newId], (err, row) => {
            event.returnValue = convertRowToPlaylist(row);
        });
    });
});
electron_1.ipcMain.on("songs-add", (event, args) => {
    var promises = [];
    for (let s of args.songs) {
        promises.push(saveSong(s.path, s.name, s.duration, s.orderIndex, args.playlistId));
    }
    Promise.all(promises).then((songs) => {
        event.returnValue = songs;
    });
});
electron_1.ipcMain.on("songs-remove", (event, args) => {
    var promises = [];
    for (let s of args.songs) {
        promises.push(removeSong(s.id));
    }
    Promise.all(promises).then(() => {
    });
});
electron_1.ipcMain.on("save-last-song", (event, args) => {
    var promises = [];
    promises.push(savePlaylistLastSongPlayed(args.playlistId, args.songId));
    promises.push(saveLastPlaylist(args.playlistId));
    Promise.all(promises).then(() => {
        mainWindow.webContents.send('save-last-song-send', 'ok');
    });
});
function saveSong(path, name, duration, orderIndex, playlistId) {
    return new Promise((resolve, reject) => {
        var newId = (0, uuid_1.v4)().toString();
        let statement = db.prepare("INSERT INTO song(id, name, path, duration, orderIndex, playlistId) VALUES(?,?,?,?,?,?)");
        statement.run([newId, name, path, duration, orderIndex, playlistId], (resp, err) => {
            db.get('SELECT * FROM song WHERE id = ?', [newId], (err, row) => {
                resolve(convertRowToSong(row));
            });
        });
    });
}
function savePlaylistLastSongPlayed(playlistId, songId) {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("UPDATE playlist SET lastSongPlayedId = ? WHERE id = ?");
        statement.run([songId, playlistId], (resp, err) => {
            resolve("");
        });
    });
}
function saveLastPlaylist(playlistId) {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("UPDATE app_config SET lastPlaylistId = ?");
        statement.run([playlistId], (resp, err) => {
            resolve("");
        });
    });
}
function removeSong(id) {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("DELETE FROM song WHERE id = ?");
        statement.run([id], (res, err) => {
            resolve(1);
        });
    });
}
function convertRowToPlaylist(row) {
    var p = new playlist_1.Playlist();
    p.id = row.id;
    p.name = row.name;
    p.songs = row.songs;
    p.created = row.created;
    p.lastSongPlayedId = row.lastSongPlayedId;
    p.songs = [];
    return p;
}
function convertRowToSong(row) {
    var s = new song_1.Song();
    s.id = row.id;
    s.name = row.name;
    s.path = row.path;
    s.duration = row.duration;
    s.orderIndex = row.orderIndex;
    return s;
}
//# sourceMappingURL=db.js.map