import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/services/artist.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

  private id: string;
  private artist: Artist;
  private url: string;
  private token: string;
  public fileToUpload: Array<File>;

  constructor(
      private _artistService: ArtistService,
      private _userService: UserService,
      private _router: Router,
      private _activatedRoute: ActivatedRoute
    ) {
      this.token = this._userService.getToken();
      this.url = _userService.url;
      this._activatedRoute.params.subscribe(
        params => {
          this.id = params['id'];
          this._artistService.getArtist(this.token, this.id).subscribe(
            response =>  {
              this.artist = response.artist;
              console.log( this.artist );
            }
          );
        }
       );
  }

  ngOnInit() {
  }

  onSubmit() {
    this._artistService.artistEdit(this.id, this.artist).subscribe(
      artistEdit => {
        if ( this.fileToUpload != null ) {
          this._artistService.makeFileRequest(this.id, [], this.fileToUpload)
          .then( (result: any) => console.log(result)  );

        } else {
          console.log(artistEdit);
        }
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <Array <File> >fileInput.target.files;
  }

}
