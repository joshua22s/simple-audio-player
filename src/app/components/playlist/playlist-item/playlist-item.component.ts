import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../../models/song';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { CountdownComponent } from '../../helpers/countdown/countdown.component';
import { PlaylistItem } from '../../../models/playlistItem';


@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input("item") item: PlaylistItem;
  @Input("selected") selected: boolean = false;

  @ViewChild("songCountdown")
  counter: CountdownComponent;

  constructor() { }

  ngOnInit(): void {
    this.item.song.durationInMillis = this.item.song.duration * 1000;
  }
}
