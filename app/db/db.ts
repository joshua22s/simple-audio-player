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
        event.returnValue = convertRowToPlaylist(row);
    });
});

ipcMain.on("playlist-get-all", (event, args) => {
    var playlists = [];
    db.each("SELECT * FROM playlist", (err: any, row: any) => {
        playlists.push(convertRowToPlaylist(row));
    });
    event.returnValue = playlists;
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

function convertRowToPlaylist(row: any): Playlist {
    var p = new Playlist();
    p.id = row.id;
    p.name = row.name;
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


