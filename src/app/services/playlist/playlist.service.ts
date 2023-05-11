import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerAction } from '../../models/playerAction';
import { Playlist } from '../../models/playlist';
import { Song } from '../../models/song';
import { IpcService } from '../ipc/ipc.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private selectedPlaylist: Playlist;

  private selectedSongDatasource = new BehaviorSubject<Song>(new Song());
  selectedSong = this.selectedSongDatasource.asObservable();

  private songActionDatasource = new BehaviorSubject<PlayerAction>(null);
  songAction = this.songActionDatasource.asObservable();

  constructor(private ipcService: IpcService) { }

  setSelectedPlaylist(playlist: Playlist) {
    this.selectedPlaylist = playlist;
  }

  setSelectedSong(song: Song) {
    this.selectedSongDatasource.next(song);
  }

  triggerSongAction(action: PlayerAction) {
    this.songActionDatasource.next(action);
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

  removePlaylist(id: string) {
    this.ipcService.send("playlist-remove", { id: id });
  }

  addSongs(songs: Song[], playlistId: string) {
    return this.ipcService.sendSync("songs-add", { songs: songs, playlistId: playlistId });
  }

  removeSongs(songs: Song[]) {
    this.ipcService.send("songs-remove", { songs: songs });
  }

  saveLastSong(): Promise<any> {
    return new Promise((res, rej) => {
      if (this.selectedPlaylist && this.selectedPlaylist.id && this.selectedSongDatasource.value && this.selectedSongDatasource.value.id) {
        this.ipcService.send("save-last-song", { playlistId: this.selectedPlaylist.id, songId: this.selectedSongDatasource.value.id });
        var sub = (event, done) => {
          res(done);
          this.ipcService.removeListener("save-last-song-send", sub);
        }
        this.ipcService.on("save-last-song-send", sub);
      } else {
        res('ok');
      }
    });
  }
}
