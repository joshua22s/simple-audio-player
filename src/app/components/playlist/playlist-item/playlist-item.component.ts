import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../../models/song';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input("song") song: Song;

  constructor() { }

  ngOnInit(): void {
    console.log(this.song);
  }

  convertDurationToReadable(seconds: number): string {
    // var numyears = Math.floor(seconds / 31536000);
    // var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    var returnString = "";
    if (numhours) {
      returnString += `${numhours}:`;
    }
    var secondsString = "";
    if (numseconds < 10) {
      secondsString += `0${numseconds}`;
    }
    return `${numminutes}:${secondsString}`;
  }

}
