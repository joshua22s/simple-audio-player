import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerAction } from '../../models/playerAction';
import { Playlist } from '../../models/playlist';
import { Song } from '../../models/song';
import { AudioService } from '../../services/audio/audio.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistItem } from '../../models/playlistItem';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  @Input("playlist") playlist: Playlist;

  @ViewChild("listWrapper") listWrapper: ElementRef;

  selectedItem: PlaylistItem = new PlaylistItem();

  contextmenu: boolean = false;
  triggerOrigin: any;
  contextmenuSong: Song = new Song();

  addSongsLoading: boolean = false;

  private selectedItemSubscription: Subscription;
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

  constructor(private playlistService: PlaylistService, private overlay: Overlay, private audioService: AudioService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.playlistService.setSelectedPlaylist(this.playlist);
    this.selectedItemSubscription = this.playlistService.selectedItem.subscribe(item => {
      this.selectedItem = item;
      if (this.listWrapper) {
        this.listWrapper.nativeElement.querySelector(`#A${item.id}-${item.playlistItemGroupId}`).scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setTimeout(() => {
          this.listWrapper.nativeElement.querySelector(`#A${item.id}-${item.playlistItemGroupId}`).scrollIntoView({ behavior: "smooth", block: "center" });
        }, 2000);
      }
    });
    this.playlistActionSubscription = this.playlistService.songAction.subscribe(action => {
      if (action) {
        switch (action) {
          case PlayerAction.NEXT:
            var g = this.playlist.groups.find(x => x.id == this.selectedItem.playlistItemGroupId);
            if (g) {
              var curIndex = g.items.findIndex(s => s.id == this.selectedItem.id);
              if (curIndex + 1 < g.items.length) {
                this.playlistService.setSelectedItem(g.items[curIndex + 1]);
              } else {
                var curGroupIndex = this.playlist.groups.findIndex(pg => pg.id == g.id);
                if (curGroupIndex + 1 < this.playlist.groups.length) {
                  var nextGroup = this.playlist.groups[curGroupIndex + 1];
                  this.playlistService.setSelectedItem(nextGroup.items[0]);
                } else {
                  this.playlistService.setSelectedItem(this.playlist.groups[0].items[0]);
                }
              }
            }
            break;
          case PlayerAction.PREVIOUS:
            var g = this.playlist.groups.find(x => x.id == this.selectedItem.playlistItemGroupId);
            if (g) {
              var curIndex = g.items.findIndex(s => s.id == this.selectedItem.id);
              if (curIndex > 0) {
                this.playlistService.setSelectedItem(g.items[curIndex - 1]);
              } else {
                var curGroupIndex = this.playlist.groups.findIndex(pg => pg.id == g.id);
                if (curGroupIndex > 0) {
                  var prevGroup = this.playlist.groups[curGroupIndex - 1];
                  this.playlistService.setSelectedItem(prevGroup.items[prevGroup.items.length - 1]);
                } else {
                  this.playlistService.setSelectedItem(this.playlist.groups[this.playlist.groups.length - 1].items[this.playlist.groups[this.playlist.groups.length - 1].items.length - 1]);
                }
              }
            }
            break;
        }
      }
      this.cd.detectChanges();
    });
    this.playlistService.setSelectedItem(this.playlist.groups.find(x => x.id == this.playlist.lastItemGroupPlayedId).items.find(y => y.id == this.playlist.lastItemPlayedId));
    if (this.playlist.lastItemPlayedPositionInSong) {
      this.playlistService.currentSongPosition = this.playlist.lastItemPlayedPositionInSong;
    }
    setTimeout(() => {
      this.playlistService.triggerSongAction(PlayerAction.EXTERNAL_PLAY);
    }, 10);
  }

  ngOnDestroy(): void {
    if (this.selectedItemSubscription) {
      this.selectedItemSubscription.unsubscribe();
    }
    if (this.playlistActionSubscription) {
      this.playlistActionSubscription.unsubscribe();
    }
  }

  selectItem(item: PlaylistItem) {
    this.playlistService.triggerSongAction(PlayerAction.STOP);
    this.audioService.pauseAudio();
    this.playlistService.setSelectedItem(item);
    this.playlistService.currentSongPosition = 0;
    this.playlistService.triggerSongAction(PlayerAction.EXTERNAL_PLAY);
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
    // this.disableContextMenu();
    // this.playlistService.removeSongs([event.song]);
    // var songIndex = this.playlist.songs.findIndex(s => s.id == event.song.id);
    // this.playlist.songs.splice(songIndex, 1);
    // if (this.selectedSong && this.selectedSong.id) {
    //   if (event.song.id == this.selectedSong.id) {
    //     if (this.playlist.songs.length < songIndex + 1) {
    //       songIndex = this.playlist.songs.length - 1;
    //     }
    //   }
    //   this.playlistService.setSelectedSong(this.playlist.songs[songIndex]);
    // }
  }

  public addSongs() {
    // setTimeout(() => {
    //   this.addSongsLoading = true;
    // }, 2000);
    // this.playlistService.openFileDialog().then((files) => {
    //   this.addSongsLoading = false;
    //   this.playlist.items = this.playlist.songs.concat(this.playlistService.addSongs(this.convertFilesToSongs(files), this.playlist.id));
    // });
  }

  private convertFilesToSongs(data: any): Song[] {
    let songs: Song[] = [];
    // var curIndex = this.playlist.songs.length;
    // for (let d of data) {
    //   var s = new Song();
    //   s.path = d.path;
    //   s.duration = d.duration;
    //   var pathSplit = s.path.split("\\");
    //   s.name = pathSplit[pathSplit.length - 1].split(".")[0];
    //   s.orderIndex = curIndex;
    //   songs.push(s);
    //   curIndex++;
    // }
    // songs.sort((a, b) => a.name.localeCompare(b.name));
    return songs;
  }

}
