import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BehaviorSubject } from 'rxjs';
import { APP_CONFIG } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class IpcService {

  private shell: any;

  private ipc: IpcRenderer;

  private oscMessageDataSource = new BehaviorSubject<any>("");
  oscMessage = this.oscMessageDataSource.asObservable();

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
        this.shell = (<any>window).require('electron').shell;
      } catch (e) {
        throw e;
      }
    }

  }

  send(path: string, args?: any) {
    if (this.isElectron()) {
      this.ipc.send(path, args);
    } else {
      console.log(`[DEBUG] send -> ${path}`);
      console.log(args);
    }
  }

  sendSync(path: string, args?: any): any {
    if (this.isElectron()) {
      return this.ipc.sendSync(path, args);
    } else {
      console.log(`[DEBUG] send sync -> ${path}`);
    }
  }

  on(path: string, callback: any) {
    return this.ipc.on(path, callback);
  }

  removeListener(channel: string, listener) {
    this.ipc.removeListener(channel, listener);
  }

  openUrl(url: string) {
    if (this.isElectron()) {
      this.shell.openExternal(url);
    } else {
      window.open(url, "_blank");
    }
  }

  isElectron() {
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
      return true;
    }
    return false;
  }
}