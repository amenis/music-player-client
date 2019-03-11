import { Component, OnInit } from '@angular/core';
import { Artist } from '../../../models/artist';
import { Config } from '../../../services/config';
import { ArtistService } from '../../../services/artist.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css']
})
export class ArtistAddComponent implements OnInit {

  titulo: string;
  artist: Artist;
  identity;
  token;
  url: string;
  alertMessage;
  fileToUpload: Array<File>;

  constructor(
      private _artistService: ArtistService,
      private _userService: UserService,
      private route: Router
    ) {
    this.titulo = 'Añadir Artista';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = Config.url;
    this.artist = new Artist('', '', 'noDisponible.png');
   }

  ngOnInit() {
  }

  onSubmit() {
    this._artistService.addArtist(this.artist).subscribe(
      response => {
        console.log(response);
        if (!response.artistStored._id) {
          this.alertMessage = 'Error al crear el registro';
        } else {
          this.alertMessage = 'El artista ha sido creado exitosamente';
          this.route.navigate(['/artist']);
        }
      },
      error => {
      const errorMesage  = <any>error;
      if ( errorMesage != null) {
        const body = JSON.parse(error._body);
        this.alertMessage = body.message;
      }
    });
  }

}
