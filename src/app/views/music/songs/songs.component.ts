import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';
import { SongsService } from 'src/app/services/songs.service';
import { Config } from 'src/app/services/config';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  private songs: Song[] ;
  private url;

  constructor(private songService: SongsService) {
    this.url = Config.url;
  }

  ngOnInit() {
    this.songService.getAllSongs().subscribe(
      songs => {
        this.songs = songs.songs;
      }
    );
  }

  play(file) {
    document.getElementById('mp3-source').setAttribute('src', `${this.url}getSongFile/${file}`);
    const media = document.getElementById('player');
    (media as any).load();
    (media as any).play();
  }

}
