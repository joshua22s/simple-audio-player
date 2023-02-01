import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist-wrapper',
  templateUrl: './playlist-wrapper.component.html',
  styleUrls: ['./playlist-wrapper.component.scss']
})
export class PlaylistWrapperComponent implements OnInit {

  currentPlaylist: Playlist;

  constructor(private router: Router, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.currentPlaylist = this.playlistService.getPlaylist(this.router.url.split("/")[2]);
  }


  createTestPlaylist() {
    this.currentPlaylist = new Playlist();
    this.currentPlaylist.id = "0";
    this.currentPlaylist.name = "Test playlist";
    this.currentPlaylist.songs = [];
    for (let i = 0; i < 18; i++) {
      this.currentPlaylist.songs.push(this.createSong(i));
    }
    this.currentPlaylist.lastPlayed = this.currentPlaylist.songs[2];
  }

  createSong(index: number): any {
    return {
      id: index,
      path: "C:\\users\\bla.mp3",
      name: "bla",
      duration: 184,
      orderIndex: index
    };
  }

}
