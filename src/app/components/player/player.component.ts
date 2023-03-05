import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerAction } from '../../models/playerAction';
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
  private songActionSubscription: Subscription;

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
          this.counter.reload();
        }
      }
    });
    this.songActionSubscription = this.playlistService.songAction.subscribe((action) => {
      switch (action) {
        case PlayerAction.EXTERNAL_PLAY:
          this.play();
          break;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.selectedSongSubscripion) {
      this.selectedSongSubscripion.unsubscribe();
    }
    if (this.songActionSubscription) {
      this.songActionSubscription.unsubscribe();
    }
  }

  onCounterTick(event: any) {
    switch (event.action) {
      case 'start':
        if (!this.paused) {
          this.playlistService.triggerSongAction(PlayerAction.PLAY);
        }
        break;
      case 'notify':
        break;
      case 'pause':
        this.playlistService.triggerSongAction(PlayerAction.PAUSE);
        break;
      case 'stop':
        this.playlistService.triggerSongAction(PlayerAction.STOP);
        this.running = false;
        this.paused = false;
        break;
      case 'end':
        this.next();
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
          this.playlistService.triggerSongAction(PlayerAction.CONTINUE);
          this.counter.start(!this.paused);
          this.paused = false;
        } else {
          this.audioService.playAudio(this.song);
          setTimeout(() => {
            this.counter.start(!this.paused);
            this.paused = false;
          }, 800);
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
    this.playlistService.triggerSongAction(PlayerAction.PREVIOUS);
    setTimeout(() => {
      this.play();
    }, 10);
  }

  next() {
    this.stop();
    this.playlistService.triggerSongAction(PlayerAction.NEXT);
    setTimeout(() => {
      this.play();
    }, 10);
  }

}
