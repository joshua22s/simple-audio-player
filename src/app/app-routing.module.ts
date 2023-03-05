import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewPlaylistComponent } from './components/new-playlist/new-playlist.component';
import { OpenPlaylistComponent } from './components/open-playlist/open-playlist.component';
import { PlaylistWrapperComponent } from './components/playlist-wrapper/playlist-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'playlists/:id',
        component: PlaylistWrapperComponent
      },
      {
        path: 'new',
        component: NewPlaylistComponent
      },
      {
        path: 'open',
        component: OpenPlaylistComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
