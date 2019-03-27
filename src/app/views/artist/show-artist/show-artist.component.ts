import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArtistService } from '../../../services/artist.service';
import { UserService } from '../../../services/user.service';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-show-artist',
  templateUrl: './show-artist.component.html',
  styleUrls: ['./show-artist.component.css']
})
export class ShowArtistComponent implements OnInit {

  private token: any;
  public artist: Artist;
  public albums: Album[];
  private id: string;
  private url: string;
  public messageAlbum: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private _artistService: ArtistService,
              private _userService: UserService
              ) {
    this.token = _userService.getToken();
    this.url = _userService.url;

    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this._artistService.getArtist(this.token, this.id).subscribe(
          response => {
             this.artist = response.artist;
            }
        );
      }
    );
  }

  getAlbumsList() {
    this._artistService.getArtistAlbums(this.token, this.id).subscribe(
      albumsList =>  this.albums = albumsList.albums
    );
  }

  delArtist() {
    this._artistService.delArtist(this.id).subscribe(
      reponse => {
        this.router.navigate(['./artist/1']);
      }
    );
  }

  ngOnInit() {
    this.getAlbumsList();
  }

}
