import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { UploadService } from 'src/app/services/upload.service';
import { Config } from 'src/app/services/config';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

  private artistId: string;
  private album: Album;
  public fileToUpload: Array<File>;
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    private albumService: AlbumService,
    private uploadService: UploadService,
    private router: Router) {
        this.artistId = this._route.snapshot.paramMap.get('id') == null ? '' : this._route.snapshot.paramMap.get('id') ;
        this.album = new Album('', '', '', '', this.artistId);
    }

  ngOnInit() {
  }

  onSubmit() {
    this.albumService.newAlbum(this.album).subscribe(
      saveAlbum => {
        if (!saveAlbum) {
          this.message = 'Error al conectarse con el servidor';
        } else {
          if (!this.fileToUpload) {
            this.message = 'Album ha sido guardado sin imagen';
          } else {
            this.uploadService.makeFileRequest(`${Config.url}uploadImagenAlbum/${saveAlbum._id}`, [] , this.fileToUpload, 'file').then(
              (success) => {
                this.message = 'El Album ha sido guardado exitosamente';
              },
              (err) => {
                this.message = err;
              }
            );
          }
          setTimeout( () => { this.router.navigate(['/showArtist', this.artistId] ); }, 500 );
        }
      }
    );
  }

  fileChangeEvent(event) {
    this.fileToUpload = <Array<File>>event.target.files;
  }

}
