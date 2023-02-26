import { Injectable } from '@angular/core';
import { Song } from '../../models/song';

import { Blob } from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio;

  constructor() { }

  playAudio(song: Song) {
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio();
    this.audio.src = song.path;
    this.audio.load();
    this.audio.play();
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
