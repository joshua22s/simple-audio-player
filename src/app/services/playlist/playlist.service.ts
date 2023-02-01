import { Injectable } from '@angular/core';
import { Song } from '../../models/song';
import { IpcService } from '../ipc/ipc.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private ipcService: IpcService) { }

  openFileDialog(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.ipcService.send("open-files");
      this.ipcService.on("open-files-change", (event, args) => {
        resolve(args);
      });
    })
  }

  getPlaylist(id: string) {
    return this.ipcService.sendSync("playlist-get", id);
  }

  getPlaylists() {
    return this.ipcService.sendSync("playlist-get-all");
  }

  createPlaylist(name: string) {
    return this.ipcService.sendSync("playlist-create", name);
  }

  addSongs(songs: Song[], playlistId: string) {
    return this.ipcService.sendSync("songs-add", { songs: songs, playlistId: playlistId });
  }
}
