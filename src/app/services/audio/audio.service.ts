import { Injectable } from '@angular/core';
import { Song } from '../../models/song';

import { BehaviorSubject, Subscription } from 'rxjs';

export class AudioTick {
  current: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioTickDatasource = new BehaviorSubject<AudioTick>(null);
  audioTickSubscription = this.audioTickDatasource.asObservable();

  private audio;

  constructor() { }

  playAudio(song: Song, folderPath: string, position?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.audio) {
        this.audio.pause();
      }
      this.audio = new Audio();
      this.audio.addEventListener("error", (err) => {
        reject();
      });
      this.audio.addEventListener("abort", () => {
        reject();
      });
      this.audio.addEventListener("canplay", () => {
        resolve("");
      });
      this.audio.addEventListener("timeupdate", () => {
        this.audioTickDatasource.next({ current: this.audio.currentTime, total: this.audio.duration });
      });
      this.audio.src = `${folderPath}\\${song.path}`;
      this.audio.load();
      this.audio.play();
      if (position) {
        this.audio.currentTime = position / 1000;
      }
    });
  }

  continueAudio() {
    if (this.audio) {
      this.audio.play();
    }
  }

  pauseAudio() {
    if (this.audio) {
      this.audio.pause();
    }
  }
}
