"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbSetup = void 0;
const electron_1 = require("electron");
const sqlite3_1 = require("sqlite3");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const song_1 = require("../models/song");
const playlist_1 = require("../models/playlist");
const path = require("path");
const playlistItem_1 = require("../models/playlistItem");
const playlistItemGroup_1 = require("../models/playlistItemGroup");
var mainWindow;
var mainApp;
var dbPath;
var db;
function dbSetup(window, app) {
    mainWindow = window;
    mainApp = app;
    dbPath = path.join(mainApp.getPath("userData"), 'db.sqlite');
    db = new sqlite3_1.Database(dbPath);
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
        getPlaylistItems(args).then(items => {
            var playlist = convertRowToPlaylist(row);
            playlist.items = items;
            mainWindow.webContents.send("playlist-get-send", playlist);
        });
    });
});
function getPlaylistItems(playlistId) {
    return new Promise((resolve, reject) => {
        var items = [];
        db.each(`SELECT pi.id as p_id, pi.playlistItemGroupId as p_playlistItemGroupId, pi.playlistId as p_playlistId, pi.orderIndex as p_orderIndex, s.id as s_id, s.name as s_name, s.path as s_path, s.duration as s_duration, pig.id as pig_id, pig.name as pig_name, pig.orderIndex as pig_orderIndex FROM playlist_item pi JOIN song s ON s.id = pi.songId JOIN playlist_item_group pig ON pig.id = pi.playlistItemGroupId WHERE pi.playlistId = ?`, [playlistId], (err, row) => {
            items.push(convertRowToPlaylistItem(row));
        }, (err, count) => {
            resolve(items);
            // console.log(items);
        });
    });
}
electron_1.ipcMain.on("playlist-get-all", (event, args) => {
    var promises = [];
    var playlists = [];
    db.each("SELECT p.id as id, p.name as name, p.created as created, p.lastItemPlayedId as lastItemPlayedId FROM playlist p", (err, row) => {
        playlists.push(convertRowToPlaylist(row));
    }, (err, count) => {
        mainWindow.webContents.send('playlist-get-all-send', playlists);
    });
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
// ipcMain.on("playlist-remove", (event, args) => {
//     removePlaylist(args.id).then(() => {
//     });
// });
// ipcMain.on("songs-add", (event, args) => {
//     var promises = [];
//     for (let s of args.songs) {
//         promises.push(saveSong(s.path, s.name, s.duration, s.orderIndex, args.playlistId));
//     }
//     Promise.all(promises).then((songs) => {
//         event.returnValue = songs;
//     });
// });
// ipcMain.on("songs-remove", (event, args) => {
//     var promises = [];
//     for (let s of args.songs) {
//         promises.push(removeSong(s.id));
//     }
//     Promise.all(promises).then(() => {
//     });
// });
electron_1.ipcMain.on("save-last-item", (event, args) => {
    var promises = [];
    promises.push(savePlaylistLastItemPlayed(args.playlistId, args.itemId, args.itemGroupId, args.positionInSong));
    // promises.push(saveLastPlaylist(args.playlistId));
    Promise.all(promises).then(() => {
        mainWindow.webContents.send('save-last-item-send', 'ok');
    });
});
// function saveSong(path: string, name: string, duration: number, orderIndex: number, playlistId: string): Promise<Song> {
//     return new Promise((resolve, reject) => {
//         var newId = uuid().toString();
//         let statement = db.prepare("INSERT INTO song(id, name, path, duration, orderIndex, playlistId) VALUES(?,?,?,?,?,?)")
//         statement.run([newId, name, path, duration, orderIndex, playlistId], (resp, err) => {
//             db.get('SELECT * FROM song WHERE id = ?', [newId], (err: any, row: any) => {
//                 resolve(convertRowToSong(row));
//             });
//         });
//     })
// }
function savePlaylistLastItemPlayed(playlistId, itemId, itemGroupId, positionInSong) {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("UPDATE playlist SET lastItemPlayedId = ?, lastItemGroupPlayedId = ?, lastItemPlayedPositionInSong = ? WHERE id = ?");
        statement.run([itemId, itemGroupId, positionInSong, playlistId], (resp, err) => {
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
function convertRowToPlaylist(row) {
    var p = new playlist_1.Playlist();
    p.id = row.id;
    p.name = row.name;
    p.items = row.items;
    p.songsFolder = row.songs_folder;
    p.created = row.created;
    p.lastItemPlayedId = row.lastItemPlayedId;
    p.lastItemGroupPlayedId = row.lastItemGroupPlayedId;
    p.lastItemPlayedPositionInSong = row.lastItemPlayedPositionInSong;
    // p.songCount = row.songCount;
    return p;
}
function convertRowToPlaylistItem(row) {
    // console.log(row);
    var i = new playlistItem_1.PlaylistItem();
    i.id = row.p_id;
    i.name = row.s_name;
    i.playlistItemGroupId = row.p_playlistItemGroupId;
    i.playlistId = row.p_playlistId;
    i.orderIndex = row.p_orderIndex;
    i.song = new song_1.Song();
    i.song.id = row.s_id;
    i.song.name = row.s_name;
    i.song.path = row.s_path;
    i.song.duration = row.s_duration;
    i.playlistItemGroup = new playlistItemGroup_1.PlaylistItemGroup();
    i.playlistItemGroup.id = row.pig_id;
    i.playlistItemGroup.name = row.pig_name;
    i.playlistItemGroup.orderIndex = row.pig_orderIndex;
    return i;
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