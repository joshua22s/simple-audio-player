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
        this.cd.detectChanges();
        if (this.counter) {
          this.counter.stop();
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
        break;
      case 'notify':
        break;
      case 'pause':
        break;
      case 'stop':
        this.running = false;
        this.paused = false;
        break;
    }
  }

  play() {
    if (!this.running) {
      if (this.counter) {
        this.running = true;
        this.audioService.playAudio(this.song);
        setTimeout(() => {
          this.counter.start(!this.paused);
        }, 1000);
        this.paused = false;
      }
    } else {
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

}
