import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Playlist } from '../../models/playlist';
import { Song } from '../../models/song';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  @Input("playlist") playlist: Playlist;

  selectedSong: Song = new Song();

  contextmenu: boolean = false;
  contextmenuX: number = 0;
  contextmenuY: number = 0;
  contextmenuSong: Song = new Song();

  private selectedSongSubscription: Subscription;
  private playlistActionSubscription: Subscription;

  menuTopLeftPosition = { x: 0, y: 0 };

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.selectedSongSubscription = this.playlistService.selectedSong.subscribe(song => {
      this.selectedSong = song;
    });
    this.playlistActionSubscription = this.playlistService.songAction.subscribe(action => {
      if (action) {
        switch (action) {
          case "next":
            var curIndex = this.playlist.songs.findIndex(s => s.id == this.selectedSong.id);
            var newIndex = 0;
            if (curIndex + 1 < this.playlist.songs.length) {
              newIndex = curIndex + 1;
            }
            this.playlistService.setSelectedSong(this.playlist.songs[newIndex]);
            break;
          case "previous":
            var curIndex = this.playlist.songs.findIndex(s => s.id == this.selectedSong.id);
            var newIndex = 0;
            if (curIndex > 0) {
              newIndex = curIndex - 1;
            }
            this.playlistService.setSelectedSong(this.playlist.songs[newIndex]);
            break;
        }
      }
    })
  }

  ngOnDestroy(): void {
    if (this.selectedSongSubscription) {
      this.selectedSongSubscription.unsubscribe();
    }
    if (this.playlistActionSubscription) {
      this.playlistActionSubscription.unsubscribe();
    }
  }

  selectSong(song: Song) {
    this.playlistService.setSelectedSong(song);
  }

  onRightClick(event, song: Song) {
    console.log(event);
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.contextmenu = true;
    this.contextmenuSong = song;
  }
  disableContextMenu() {
    this.contextmenu = false;
  }
  onMenuClick(event) {
    this.disableContextMenu();
    console.log(event);
    this.playlistService.removeSongs([event.song]);
    var songIndex = this.playlist.songs.findIndex(s => s.id == event.song.id);
    this.playlist.songs.splice(songIndex, 1);
    if (event.song.id == this.selectedSong.id) {
      if (this.playlist.songs.length < songIndex + 1) {
        songIndex = this.playlist.songs.length - 1;
      }
    }
    this.playlistService.setSelectedSong(this.playlist.songs[songIndex]);
  }

  public addSongs() {
    this.playlistService.openFileDialog().then((files) => {
      this.playlist.songs = this.playlist.songs.concat(this.playlistService.addSongs(this.convertFilesToSongs(files), this.playlist.id));
      console.log(this.playlist.songs);
    });
  }

  private convertFilesToSongs(data: any): Song[] {
    let songs: Song[] = [];
    var curIndex = this.playlist.songs.length;
    for (let d of data) {
      var s = new Song();
      s.path = d.path;
      s.duration = d.duration;
      var pathSplit = s.path.split("\\");
      s.name = pathSplit[pathSplit.length - 1].split(".")[0];
      s.orderIndex = curIndex;
      songs.push(s);
      curIndex++;
    }
    return songs;
  }

}
