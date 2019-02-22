import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
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
  public token;
  public identity;
  public url: string;

  constructor(
    private _artistService: ArtistService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.url = Config.url;
    this.showListArtist();
   }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.titulo = 'Artist';
  }

  showListArtist() {
    this._artistService.getArtistList().subscribe(
      response => {
        this.artist = response.artist;
        console.log(this.artist);
      }
    );
  }
}
