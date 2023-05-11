import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-open-playlist',
  templateUrl: './open-playlist.component.html',
  styleUrls: ['./open-playlist.component.scss']
})
export class OpenPlaylistComponent implements OnInit {

  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private router: Router) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists() {
    this.playlistService.getPlaylists().then(playlists => {
      this.playlists = playlists as Playlist[];
      this.playlists.sort((a, b) => a.created - b.created);
    })
  }

  openPlaylist(playlist: Playlist) {
    this.router.navigateByUrl(`playlists/${playlist.id}`);
  }

  deletePlaylist(playlist: Playlist) {
    this.playlistService.removePlaylist(playlist.id);
    this.playlists.splice(this.playlists.findIndex(x => x.id == playlist.id), 1);
  }

}
