import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IpcService } from '../ipc/ipc.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private ipcService: IpcService) { }

  getConfig() {
    return new Promise((res, rej) => {
      this.ipcService.send("config-get");
      var sub = (event, config) => {
        res(config);
        this.ipcService.removeListener("config-get-send", sub);
      }
      this.ipcService.on("config-get-send", sub);
    })
  }

  onAppClose(): Observable<any> {
    return new Observable((observer) => {
      this.ipcService.on("trigger-close-actions", (event, args) => {
        observer.next();
      });
    });
  }

  closeApp() {
    this.ipcService.send("close");
  }
}
