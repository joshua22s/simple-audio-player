import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

  public addSongs() {
    this.playlistService.openFileDialog().then((songs) => {
      console.log(songs);
    });
  }

}
