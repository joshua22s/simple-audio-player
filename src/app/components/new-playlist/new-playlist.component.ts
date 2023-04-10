import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss']
})
export class NewPlaylistComponent implements OnInit {

  playlistNameFormControl = new FormControl("", [Validators.required]);

  constructor(private router: Router, private playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

  create() {
    var playlist = this.playlistService.createPlaylist(this.playlistNameFormControl.value) as Playlist;
    this.router.navigateByUrl(`playlists/${playlist.id}`);
  }

}
