import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistItem } from '../../models/playlistItem';
import { PlaylistItemGroup } from '../../models/playlistItemGroup';

@Component({
  selector: 'app-playlist-wrapper',
  templateUrl: './playlist-wrapper.component.html',
  styleUrls: ['./playlist-wrapper.component.scss']
})
export class PlaylistWrapperComponent implements OnInit {

  currentPlaylist: Playlist;

  constructor(private router: Router, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlistService.getPlaylist("1").then(playlist => {
      this.currentPlaylist = this.convertPlaylistForDisplaying(playlist);
      console.log(this.currentPlaylist);
    });
  }


  createTestPlaylist() {
    // this.currentPlaylist = new Playlist();
    // this.currentPlaylist.id = "0";
    // this.currentPlaylist.name = "Test playlist";
    // this.currentPlaylist.songs = [];
    // for (let i = 0; i < 18; i++) {
    //   this.currentPlaylist.songs.push(this.createSong(i));
    // }
    // this.currentPlaylist.lastPlayed = this.currentPlaylist.songs[2];
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

  private convertPlaylistForDisplaying(p: Playlist): Playlist {
    var d = new Playlist();
    d.id = p.id;
    d.name = p.name;
    d.created = p.created;
    d.lastItemPlayedId = p.lastItemPlayedId;
    d.lastPlayed = p.lastPlayed;
    d.songsFolder = p.songsFolder;
    var listGroup: PlaylistItemGroup;
    var groups: PlaylistItemGroup[] = [];
    d.groups = [];
    for (let item of p.items) {
      if (item.playlistItemGroup.name.toLowerCase().startsWith("lijst")) {
        if (!listGroup) {
          listGroup = JSON.parse(JSON.stringify(item.playlistItemGroup));
          listGroup.items = [];
        }
        listGroup.items.push(item);
      } else {
        var groupFound = groups.find(x => x.id == item.playlistItemGroup.id);
        if (!groupFound) {
          groupFound = JSON.parse(JSON.stringify(item.playlistItemGroup));
          groupFound.items = [];
          groupFound.items.push(item);
          groups.push(groupFound);
        } else {
          groupFound.items.push(item);
        }
      }
    }
    var i = 0;
    for (let group of groups) {
      var lg = JSON.parse(JSON.stringify(listGroup)) as PlaylistItemGroup;
      lg.orderIndex = i;
      lg.id = i * 10 + "";
      i++;
      d.groups.push(lg);
      var g = JSON.parse(JSON.stringify(group)) as PlaylistItemGroup;
      g.orderIndex = i;
      d.groups.push(g);
      i++;
    }
    for (let group of d.groups) {
      for (let item of group.items) {
        item.playlistItemGroupId = group.id;
      }
      group.items.sort((a,b) => a.orderIndex - b.orderIndex);
    }
    d.groups.sort((a,b) => a.orderIndex - b.orderIndex);

    return d;
  }

}
