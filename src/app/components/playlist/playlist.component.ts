import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  private selectedSongSubscription: Subscription;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.selectedSongSubscription = this.playlistService.selectedSong.subscribe(song => {
      this.selectedSong = song;
    });
  }

  ngOnDestroy(): void {
    if (this.selectedSongSubscription) {
      this.selectedSongSubscription.unsubscribe();
    }
  }

  selectSong(song: Song) {
    this.playlistService.setSelectedSong(song);
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
