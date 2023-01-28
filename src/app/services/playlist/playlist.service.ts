import { Injectable } from '@angular/core';
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
}
