import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../models/song';
import { AudioService } from '../../services/audio/audio.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { CountdownComponent } from '../helpers/countdown/countdown.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private selectedSongSubscripion: Subscription;

  @ViewChild("songCountdown")
  counter: CountdownComponent;

  song: Song;

  running: boolean = false;
  paused: boolean = false;

  constructor(private playlistService: PlaylistService, private audioService: AudioService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedSongSubscripion = this.playlistService.selectedSong.subscribe(song => {
      if (song) {
        this.song = song;
        this.song.durationInMillis = song.duration * 1000;
        this.running = false;
        this.paused = false;
        this.cd.detectChanges();
        if (this.counter) {
          // this.counter.stop();
          this.counter.reload();
        }
        //auto play
        // this.running = false;
        // this.paused = false;
        // this.play();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.selectedSongSubscripion) {
      this.selectedSongSubscripion.unsubscribe();
    }
  }

  onCounterTick(event: any) {
    switch (event.action) {
      case 'start':
        this.playlistService.triggerSongAction("start");
        break;
      case 'notify':
        break;
      case 'pause':
        this.playlistService.triggerSongAction("pause");
        break;
      case 'stop':
        this.playlistService.triggerSongAction("stop");
        this.running = false;
        this.paused = false;
        break;
      case 'end':
        this.playlistService.triggerSongAction("next");
        this.play();
        break;

    }
  }

  play() {
    if (!this.running) {
      //play
      if (this.counter) {
        this.running = true;
        if (this.paused) {
          this.audioService.continueAudio();
          this.counter.start(!this.paused);
          this.paused = false;
        } else {
          this.audioService.playAudio(this.song);
          setTimeout(() => {
            this.counter.start(!this.paused);
            this.paused = false;
          }, 1000);
        }
      }
    } else {
      //pause
      if (this.counter) {
        this.running = false;
        this.paused = true;
        this.counter.pause();
        this.audioService.pauseAudio();
      }
    }
  }

  stop() {
    this.counter.stop();
    this.running = false;
    this.paused = false;
    this.audioService.pauseAudio();
  }

  previous() {
    this.stop();
    this.playlistService.triggerSongAction("previous");
    this.play();
  }

  next() {
    this.stop();
    this.playlistService.triggerSongAction("next");
    this.play();
  }

}
