import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.createTestPlaylist();
  }


  newPlaylist() {
    this.router.navigateByUrl("/new");
  }

  openPlaylist() {
    this.router.navigateByUrl("/open");
  }

}
