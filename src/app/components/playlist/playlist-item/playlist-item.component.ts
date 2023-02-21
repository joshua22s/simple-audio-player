import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../../models/song';
import { PlaylistItemRightClickMenuComponent } from './playlist-item-right-click-menu/playlist-item-right-click-menu.component';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  menu = PlaylistItemRightClickMenuComponent;

  @Input("song") song: Song;
  @Input("selected") selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
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
