import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../services/general/general.service';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private closeSubscription: Subscription;

  constructor(private router: Router, private generalService: GeneralService, private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.generalService.getConfig().then((config: any) => {
      if (config) {
        this.router.navigateByUrl(`playlists/${config.lastPlaylistId}`);
      }
    });
    this.closeSubscription = this.generalService.onAppClose().subscribe(() => {
      this.playlistService.saveLastItem().then(() => {
        this.generalService.closeApp();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }


  newPlaylist() {
    this.router.navigateByUrl("/new");
  }

  openPlaylist() {
    this.router.navigateByUrl("/open");
  }

  openDevTools() {
    this.generalService.openDevTools();
  }

}
