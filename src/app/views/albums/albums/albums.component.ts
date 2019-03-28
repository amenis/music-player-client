import { Component, OnInit } from '@angular/core';
import { Album } from '../../../models/album';
import { AlbumService } from 'src/app/services/album.service';
import { Config } from 'src/app/services/config';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  private albums: Album[];
  private url;

  constructor(private albumService: AlbumService) {
    this.url = Config.url;
  }

  ngOnInit() {
    this.albumService.getAll().subscribe(
      albums => {
        this.albums = albums.albums;
        console.log(albums);
      }
    );
  }

}
