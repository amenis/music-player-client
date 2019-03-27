import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album';
import { Config } from 'src/app/services/config';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {

    public album: Album;
    private url;
    private idAlbum;
    public message;

  constructor(private http: Http,
              private route: ActivatedRoute,
              private albumService: AlbumService,
              private router: Router) {

    this.url = Config.url;
    this.route.params.subscribe(
      params => {
        this.idAlbum = params['id'];
        this.albumService.getAlbums(this.idAlbum).subscribe(
          album => {
            console.log(album.album);
            this.album = album.album;
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    this.albumService.editAlbum(this.album).subscribe(
      editAlbum => {
        if (!editAlbum) {
         this.message = 'Error al conectar con el servidor';
        } else {
          this.message = 'El album ha sido modificado correctamente';
          this.router.navigate([`/showArtist/`, ]);
        }
      }
    );
  }
}
