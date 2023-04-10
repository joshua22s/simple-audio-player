import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerAction } from '../../models/playerAction';
import { Playlist } from '../../models/playlist';
import { Song } from '../../models/song';
import { AudioService } from '../../services/audio/audio.service';
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
  triggerOrigin: any;
  contextmenuSong: Song = new Song();

  private selectedSongSubscription: Subscription;
  private playlistActionSubscription: Subscription;

  connectedPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetX: -155
    }
  ];

  constructor(private playlistService: PlaylistService, private overlay: Overlay, private audioService: AudioService) { }

  ngOnInit(): void {
    this.playlistService.setSelectedPlaylist(this.playlist);
    this.selectedSongSubscription = this.playlistService.selectedSong.subscribe(song => {
      this.selectedSong = song;
    });
    this.playlistActionSubscription = this.playlistService.songAction.subscribe(action => {
      if (action) {
        switch (action) {
          case PlayerAction.NEXT:
            var curIndex = this.playlist.songs.findIndex(s => s.id == this.selectedSong.id);
            var newIndex = 0;
            if (curIndex + 1 < this.playlist.songs.length) {
              newIndex = curIndex + 1;
            }
            this.playlistService.setSelectedSong(this.playlist.songs[newIndex]);
            break;
          case PlayerAction.PREVIOUS:
            var curIndex = this.playlist.songs.findIndex(s => s.id == this.selectedSong.id);
            var newIndex = 0;
            if (curIndex > 0) {
              newIndex = curIndex - 1;
            }
            this.playlistService.setSelectedSong(this.playlist.songs[newIndex]);
            break;
          }
        }
      });
      this.playlistService.setSelectedSong(this.playlist.songs.find(s => s.id == this.playlist.lastSongPlayedId));
      setTimeout(() => {
        this.playlistService.triggerSongAction(PlayerAction.EXTERNAL_PLAY);
      }, 10);
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
    this.playlistService.triggerSongAction(PlayerAction.STOP);
    this.audioService.pauseAudio();
    this.playlistService.setSelectedSong(song);
  }

  onRightClick(trigger, song: Song) {
    this.triggerOrigin = trigger;
    this.contextmenu = true;
    this.contextmenuSong = song;
  }
  disableContextMenu() {
    this.contextmenu = false;
  }
  onMenuClick(event) {
    this.disableContextMenu();
    this.playlistService.removeSongs([event.song]);
    var songIndex = this.playlist.songs.findIndex(s => s.id == event.song.id);
    this.playlist.songs.splice(songIndex, 1);
    if (this.selectedSong && this.selectedSong.id) {
      if (event.song.id == this.selectedSong.id) {
        if (this.playlist.songs.length < songIndex + 1) {
          songIndex = this.playlist.songs.length - 1;
        }
      }
      this.playlistService.setSelectedSong(this.playlist.songs[songIndex]);
    }
  }

  public addSongs() {
    this.playlistService.openFileDialog().then((files) => {
      this.playlist.songs = this.playlist.songs.concat(this.playlistService.addSongs(this.convertFilesToSongs(files), this.playlist.id));
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
