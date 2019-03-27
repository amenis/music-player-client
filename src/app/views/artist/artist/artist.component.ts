import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from '../../../services/config';
import { UserService } from '../../../services/user.service';
import { Artist } from '../../../models/artist';
import { ArtistService } from '../../../services/artist.service';



@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  public titulo: string;
  public artist: Artist[];
  public token: any;
  public identity: any;
  public url: string;
  public next_page: number;
  public prev_page: number;

  constructor(
    private _artistService: ArtistService,
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.url = Config.url;
    this.token = this._userService.getToken();
    this.next_page = 1;
    this.prev_page = 1;
   }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.titulo = 'Artist';
    this.showListArtist();
  }

  showListArtist() {

      this._activatedRoute.params.forEach(
        (params: Params) => {
          let page = +params['page'];
          if (!page) {
            page = 1;
          } else {
            this.next_page = page + 1;
            this.prev_page = page - 1;
            if (this.prev_page === 0) {
              this. prev_page = 1;
            }
          }

          this._artistService.getArtistList(  page  ).subscribe(
            artistList => {
              if ( !artistList.artist ) {
                this._router.navigate(['/']);
              } else {
                this.artist = artistList.artist;
              }
            },
            error => {
               const errorMessge = <any>error;
               if ( errorMessge != null ) {
                 const body = JSON.parse(error._body);
                 console.log(error);
               }
            }
          );

        }
      );
  }

  editArtist(token, idArtist) {

  }
}
