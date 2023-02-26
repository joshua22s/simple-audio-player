import { ipcMain } from 'electron';
import { Database, Statement } from 'sqlite3';
import { v4 as uuid } from 'uuid';
import { Playlist } from '../../src/app/models/playlist';
import { readFileSync } from 'fs';
import { Song } from '../../src/app/models/song';
var mainWindow;
const db = new Database('db.sqlite');

export function dbSetup(window: any) {
    mainWindow = window;
    db.exec(readFileSync(`${__dirname}/script.sql`).toString());
}

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
    db.each("SELECT * FROM playlist", (err: any, row: any) => {
        // console.log("hello");
        // console.log(row);
        // promises.push(new Promise((res, rej) => {
        //     res(convertRowToPlaylist(row));
        // }));
        playlists.push(convertRowToPlaylist(row));
    }, (err: any, count: number) => {
        // console.log(playlists);
        mainWindow.webContents.send('playlist-get-all-send', playlists);
    });
    // Promise.all(promises).then(playlists => {
    //     console.log("all playlists");
    //     console.log(playlists);
    //     mainWindow.webContents.send('playlist-get-all-send', playlists);
    // })
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

function saveSong(path: string, name: string, duration: number, orderIndex: number, playlistId: number): Promise<Song> {
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
    p.songs = [];
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


