import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { UserEditComponent } from './views/user/user-edit/user-edit.component';
import { LoginComponent } from './views/init/login/login.component';
import { RegisterUserComponent } from './views/init/register/register-user/register-user.component';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';

import { UserService } from './services/user.service';
import { GuardService } from './services/guard.service';
import { HeaderComponent } from './views/headers/header/header.component';
import { SongsComponent } from './views/music/songs/songs.component';
import { ArtistComponent } from './views/artist/artist/artist.component';
import { AlbumsComponent } from './views/albums/albums/albums.component';
import { ArtistAddComponent } from './views/artist/artistAdd/artist-add.component';
import { EditArtistComponent } from './views/artist/edit-artist/edit-artist.component';
import { ArtistService } from './services/artist.service';
import { ShowArtistComponent } from './views/artist/show-artist/show-artist.component';
import { ArtistAlbumComponent, NgbdModalConfirmComponent } from './views/albums/artist-album/artist-album.component';
import { PlayerComponent } from './views/player/player.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterUserComponent },
  { path: 'editUser', component: UserEditComponent, canActivate: [GuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService] },
  { path: 'music', component: SongsComponent, canActivate: [GuardService] },
  { path: 'artist/:page', component: ArtistComponent, canActivate: [GuardService] },
  { path: 'showArtist/:id', component: ShowArtistComponent, canActivate: [GuardService] },
  { path: 'artistAdd', component: ArtistAddComponent, canActivate: [GuardService]  },
  { path: 'editArtist/:id', component: EditArtistComponent, canActivate: [GuardService] },
  { path: 'albums', component: AlbumsComponent, canActivate: [GuardService] },
  { path: 'getAlbumSong/:id', component: ArtistAlbumComponent, canActivate: [GuardService] },
  { path: '**', component: DashboardComponent, canActivate: [GuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    LoginComponent,
    RegisterUserComponent,
    DashboardComponent,
    HeaderComponent,
    SongsComponent,
    ArtistComponent,
    AlbumsComponent,
    ArtistAddComponent,
    EditArtistComponent,
    ShowArtistComponent,
    ArtistAlbumComponent,
    PlayerComponent,
    NgbdModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [
    UserService,
    GuardService,
    ArtistService
  ],
  entryComponents: [NgbdModalConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
