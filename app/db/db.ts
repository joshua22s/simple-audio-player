import { ipcMain } from 'electron';
import { Database, Statement } from 'sqlite3';
import { v4 as uuid } from 'uuid';
import { readFileSync } from 'fs';
import { Song } from '../models/song';
import { Playlist } from '../models/playlist';
import * as path from 'path';
var mainWindow;
var mainApp;
var dbPath;
var db;

export function dbSetup(window: any, app: any) {
    mainWindow = window;
    mainApp = app;
    dbPath = path.join(mainApp.getPath("userData"), 'db.sqlite');
    db = new Database(dbPath);
    db.exec(readFileSync(`${__dirname}/script.sql`).toString());
}

ipcMain.on("config-get", (event, args) => {
    db.get('SELECT * FROM app_config LIMIT 1', (err: any, row: any) => {
        mainWindow.webContents.send("config-get-send", row);
    });
})

ipcMain.on("playlist-get", (event, args) => {
    db.get(`SELECT * FROM playlist WHERE id = ?`, [args], (err: any, row: any) => {
        getPlaylistSongs(args).then(songs => {
            var playlist = convertRowToPlaylist(row);
            playlist.songs = songs;
            mainWindow.webContents.send("playlist-get-send", playlist);
        });
    });
});

function getPlaylistSongs(playlistId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var songs = [];
        db.each(`SELECT * FROM song WHERE playlistId = ?`, [playlistId], (err: any, row: any) => {
            songs.push(convertRowToSong(row));
        }, (err: any, count: number) => {
            resolve(songs);
        });
    });
}

ipcMain.on("playlist-get-all", (event, args) => {
    var promises = [];
    var playlists = [];
    db.each("SELECT p.id as id, p.name as name, p.created as created, p.lastSongPlayedId as lastSongPlayedId FROM playlist p", (err: any, row: any) => {
        playlists.push(convertRowToPlaylist(row));
    }, (err: any, count: number) => {
        mainWindow.webContents.send('playlist-get-all-send', playlists);
    });
});

ipcMain.on("playlist-create", (event, args) => {
    var name = args;
    var newId = uuid().toString();
    var newDate = new Date().getTime();
    const statement = db.prepare("INSERT INTO playlist(id, name, created) VALUES(?,?,?)");
    statement.run([newId, name, newDate], (resp, err) => {
        db.get(`SELECT * FROM playlist WHERE id = ?`, [newId], (err: any, row: any) => {
            event.returnValue = convertRowToPlaylist(row);
        });
    });
});

ipcMain.on("playlist-remove", (event, args) => {
    removePlaylist(args.id).then(() => {

    });
});

ipcMain.on("songs-add", (event, args) => {
    var promises = [];
    for (let s of args.songs) {
        promises.push(saveSong(s.path, s.name, s.duration, s.orderIndex, args.playlistId));
    }
    Promise.all(promises).then((songs) => {
        event.returnValue = songs;
    });
});

ipcMain.on("songs-remove", (event, args) => {
    var promises = [];
    for (let s of args.songs) {
        promises.push(removeSong(s.id));
    }
    Promise.all(promises).then(() => {

    });
});

ipcMain.on("save-last-song", (event, args) => {
    var promises = [];
    promises.push(savePlaylistLastSongPlayed(args.playlistId, args.songId));
    promises.push(saveLastPlaylist(args.playlistId));
    Promise.all(promises).then(() => {
        mainWindow.webContents.send('save-last-song-send', 'ok');
    });
});

function saveSong(path: string, name: string, duration: number, orderIndex: number, playlistId: string): Promise<Song> {
    return new Promise((resolve, reject) => {
        var newId = uuid().toString();
        let statement = db.prepare("INSERT INTO song(id, name, path, duration, orderIndex, playlistId) VALUES(?,?,?,?,?,?)")
        statement.run([newId, name, path, duration, orderIndex, playlistId], (resp, err) => {
            db.get('SELECT * FROM song WHERE id = ?', [newId], (err: any, row: any) => {
                resolve(convertRowToSong(row));
            });
        });
    })
}

function savePlaylistLastSongPlayed(playlistId: string, songId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("UPDATE playlist SET lastSongPlayedId = ? WHERE id = ?");
        statement.run([songId, playlistId], (resp, err) => {
            resolve("");
        });
    });
}

function saveLastPlaylist(playlistId: string) {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("UPDATE app_config SET lastPlaylistId = ?");
        statement.run([playlistId], (resp, err) => {
            resolve("");
        });
    });
}

function removePlaylist(id: string) {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("DELETE FROM playlist WHERE id = ?")
        statement.run([id], (res, err) => {
            let songsStatement = db.prepare("DELETE FROM song WHERE playlistId = ?")
            songsStatement.run([id], (resSong, errSong) => {
                resolve(1);
            });
        });
    });
}

function removeSong(id: string) {
    return new Promise((resolve, reject) => {
        let statement = db.prepare("DELETE FROM song WHERE id = ?");
        statement.run([id], (res, err) => {
            resolve(1);
        });
    })
}

function convertRowToPlaylist(row: any): Playlist {
    var p = new Playlist();
    p.id = row.id;
    p.name = row.name;
    p.songs = row.songs;
    p.created = row.created;
    p.lastSongPlayedId = row.lastSongPlayedId;
    p.songs = [];
    p.songCount = row.songCount;
    return p
}

function convertRowToSong(row: any): Song {
    var s = new Song();
    s.id = row.id;
    s.name = row.name;
    s.path = row.path;
    s.duration = row.duration;
    s.orderIndex = row.orderIndex;
    return s;
}


