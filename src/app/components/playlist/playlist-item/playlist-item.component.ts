import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../../models/song';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { CountdownComponent } from '../../helpers/countdown/countdown.component';


@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit, OnDestroy {

  @Input("song") song: Song;
  @Input("selected") selected: boolean = false;

  @ViewChild("songCountdown")
  counter: CountdownComponent;

  private songActionSubscription: Subscription;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.songActionSubscription = this.playlistService.songAction.subscribe(action => {
      if (this.selected && this.counter) {
        switch (action) {
          case "start":
            this.counter.start(true);
            break;
          case "pause":
            this.counter.pause();
            break;
        }
      } else {
        this.counter.reload();
      }
    });
    this.song.durationInMillis = this.song.duration * 1000;
  }

  ngOnDestroy(): void {
    if (this.songActionSubscription) {
      this.songActionSubscription.unsubscribe();
    }
  }

  convertDurationToReadable(seconds: number): string {
    var hours = Math.round(Math.floor(seconds / 3600));
    var minutes = Math.round(Math.floor((seconds - (hours * 3600)) / 60));
    var seconds = Math.round(seconds - (hours * 3600) - (minutes * 60));
    var hoursString = hours < 10 ? '0' + hours : hours;
    var minutesString = minutes < 10 ? '0' + minutes : minutes;
    var secondsString = seconds < 10 ? '0' + seconds : seconds;
    if (!!hours) {
      if (!!minutes) {
        return `${hoursString}:${minutesString}:${secondsString}`
      } else {
        return `${hoursString}:${secondsString}`
      }
    }
    if (!!minutes) {
      return `${minutesString}:${secondsString}`
    }
    return `00:${secondsString}`
  }
}
