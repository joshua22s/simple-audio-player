import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistItemComponent } from './components/playlist/playlist-item/playlist-item.component';
import { InputComponent } from './components/helpers/input/input.component';
import { NewPlaylistComponent } from './components/new-playlist/new-playlist.component';
import { OpenPlaylistComponent } from './components/open-playlist/open-playlist.component';
import { ButtonComponent } from './components/helpers/button/button.component';
import { PlaylistWrapperComponent } from './components/playlist-wrapper/playlist-wrapper.component';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    PlaylistComponent,
    PlaylistItemComponent,
    InputComponent,
    NewPlaylistComponent,
    OpenPlaylistComponent,
    ButtonComponent,
    PlaylistWrapperComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
