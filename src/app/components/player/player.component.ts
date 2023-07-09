import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerAction } from '../../models/playerAction';
import { Song } from '../../models/song';
import { AudioService } from '../../services/audio/audio.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { CountdownComponent } from '../helpers/countdown/countdown.component';
import { PlaylistItem } from '../../models/playlistItem';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  private selectedSongSubscripion: Subscription;
  private songActionSubscription: Subscription;
  private audioTickSubscription: Subscription;

  @ViewChild("songCountdown")
  counter: CountdownComponent;

  song: Song;
  item: PlaylistItem;
  running: boolean = false;
  paused: boolean = false;
  error: boolean = false;

  currentTime: number = 0;

  constructor(private playlistService: PlaylistService, private audioService: AudioService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.error = false;
    this.selectedSongSubscripion = this.playlistService.selectedItem.subscribe(item => {
      if (item) {
        this.error = false;
        this.song = item.song;
        this.item = item;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.song.name
        })
        this.song.durationInMillis = item.song.duration * 1000;
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
          this.error = false;
          this.play(false, this.playlistService.currentSongPosition ? this.playlistService.currentSongPosition : 0);
          break;
          case PlayerAction.EXIT:
            this.playlistService.currentSongPosition = this.counter.duration - this.counter.timeLeft;
            break;
      }
    });
    this.setMediaSessionActions();
    // this.audioTickSubscription = this.audioService.audioTickSubscription.subscribe((tick) => {
    //   console.log(tick);
    //   if (tick && tick.total) {
    //     this.currentTime = Math.round(tick.total - tick.current);
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.selectedSongSubscripion) {
      this.selectedSongSubscripion.unsubscribe();
    }
    if (this.songActionSubscription) {
      this.songActionSubscription.unsubscribe();
    }
    if (this.audioTickSubscription) {
      this.audioTickSubscription.unsubscribe();
    }
    this.stop();
  }

  setMediaSessionActions() {
    navigator.mediaSession.setActionHandler("play", () => {
      if (!this.error) {
        this.play();
        this.cd.detectChanges();
      } else {
        this.running = false;
      }
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      if (!this.error) {
        this.play();
        this.cd.detectChanges();
      } else {
        this.running = false;
      }
    });
    navigator.mediaSession.setActionHandler("stop", () => {
      this.stop();
      this.cd.detectChanges();
    });
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      this.next();
      this.cd.detectChanges();
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      this.previous();
      this.cd.detectChanges();
    });
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
        this.next(true);
        break;

    }
  }

  play(auto?: boolean, position?: number) {
    this.error = false;
    if (!this.running) {
      //play
      if (this.counter) {
        if (this.paused) {
          this.running = true;
          this.audioService.continueAudio();
          this.playlistService.triggerSongAction(PlayerAction.CONTINUE);
          this.counter.start(!this.paused);
          this.paused = false;
        } else {
          this.playlistService.saveLastItem();
          this.audioService.playAudio(this.song, this.playlistService.getSelectedPlaylist().songsFolder, position).then(() => {
            this.running = true;
            setTimeout(() => {
              this.counter.start(!this.paused, position);
              this.paused = false;
            }, 800);
          }).catch(() => {
            this.error = true;
            if (auto) {
              setTimeout(() => {
                this.next();
              }, 4000);
            }
          });
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
    this.error = false;
    if (this.counter) {
      this.counter.stop();
    }
    this.running = false;
    this.paused = false;
    this.audioService.pauseAudio();
  }

  previous() {
    this.error = false;
    this.stop();
    this.playlistService.triggerSongAction(PlayerAction.PREVIOUS);
    setTimeout(() => {
      this.play();
    }, 10);
  }

  next(auto?: boolean) {
    this.error = false;
    this.stop();
    this.playlistService.triggerSongAction(PlayerAction.NEXT);
    setTimeout(() => {
      this.play(auto);
    }, 10);
  }

}
