import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from '../../models/playlist';
import { Song } from '../../models/song';
import { IpcService } from '../ipc/ipc.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private selectedSongDatasource = new BehaviorSubject<Song>(new Song());
  selectedSong = this.selectedSongDatasource.asObservable();

  constructor(private ipcService: IpcService) { }

  setSelectedSong(song: Song) {
    this.selectedSongDatasource.next(song);
  }

  openFileDialog(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ipcService.send("open-files");
      var sub = (event, args) => {
        resolve(args);
        this.ipcService.removeListener("open-files-change", sub);
      }
      this.ipcService.on("open-files-change", sub);
    });
  }

  getPlaylist(id: string): Promise<Playlist> {
    return new Promise((resolve, reject) => {
      this.ipcService.send("playlist-get", id);
      var sub = (event, playlist) => {
        resolve(playlist);
        this.ipcService.removeListener("playlist-get-send", sub);
      }
      this.ipcService.on("playlist-get-send", sub);
    });
  }

  getPlaylists(): Promise<any> {
    return new Promise((res, rej) => {
      this.ipcService.send("playlist-get-all");
      var sub = (event, playlists) => {
        res(playlists);
        this.ipcService.removeListener("playlist-get-all-send", sub);
      }
      this.ipcService.on("playlist-get-all-send", sub);
    });
  }

  createPlaylist(name: string) {
    return this.ipcService.sendSync("playlist-create", name);
  }

  addSongs(songs: Song[], playlistId: string) {
    return this.ipcService.sendSync("songs-add", { songs: songs, playlistId: playlistId });
  }
}
