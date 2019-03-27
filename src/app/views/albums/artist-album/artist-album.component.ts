import { Component, OnInit } from '@angular/core';
import { Song } from '../../../models/song';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../../services/album.service';
import { Config } from '../../../services/config';
import { Album } from 'src/app/models/album';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '../../../services/upload.service';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-ngdb-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Agregar Cancion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form #formAddSong="ngForm">
      <div class="form-group">
        <label>Numero</label>
        <input type="text" name="number"  class="form-control" #name="ngModel"  [(ngModel)] = "song.number">
      </div>
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" name="name" class="form-control" #name="ngModel" [(ngModel)]="song.name" required>
        <span *ngIf="!name.valid && name.touched">
          El nombre es obligatorio
        </span>
      </div>
      <div class="form-group">
        <label>Duracion</label>
        <input type="text" name="duration" class="form-control" #duration="ngModel" [(ngModel)]="song.duration" required>
        <span *ngIf="!name.valid && name.touched">
          La duración es obligatoria
        </span>
      </div>
      <div class="form-group">
        <input type="hidden" name="album" class="form-control" #album="ngModel" [(ngModel)]="song.album" readonly>
      </div>
      <div class="form-group">
        <input type="file" (change)="fileToUpload($event)" #file required>
        <span *ngIf="!album.valid && album.touched">
          El archivo es obligatorio
        </span>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="delInfoAlbum();modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="onSubmit()" >Ok</button>
  </div>
  `
})

export class NgbdModalConfirmComponent {

  public song: Song;
  public album;
  public fileUpload;
  public message;
  private url;
  constructor(public modal: NgbActiveModal, private uploadService: UploadService, private songService: SongsService ) {
    this.album = localStorage.getItem('album');
    this.song = new Song('', '', '', '', this.album);
    this.url = Config.url;
  }

  onSubmit() {
    this.songService.saveSong(this.song).subscribe(
      saveSong => {
          if (!saveSong) {
          console.log('Hubo un error en el servidor');
        } else {
          this.message = 'La cancion ha sido subida exitosamente';
          if (!this.fileUpload) {
          } else {
            this.uploadService.makeFileRequest(`${Config.url}updatesong/${this.album}`, [], this.fileUpload , 'file')
            .then(
              (result) => {
                console.log('song added');
                this.delInfoAlbum();
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      }
    );
  }

  fileToUpload(fileInput: any) {
    this.fileUpload = <Array <File>>fileInput.target.files;
  }

  delInfoAlbum() {
    localStorage.removeItem('album');
  }
}


@Component({
  selector: 'app-artist-album',
  templateUrl: './artist-album.component.html',
  styleUrls: ['./artist-album.component.css']
})
export class ArtistAlbumComponent implements OnInit {

  public song: Song[];
  public album: Album;
  public message: string;
  private url: string;
  private id;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private _modalService: NgbModal,
    private songService: SongsService) {

        this.url = Config.url;
        this.route.params.subscribe(
          params => {
            this.id = params['id'];
            this.albumService.albulmDetails(this.id).subscribe(
              song => {
                this.song = song.songs;
                console.log(song.name);
              }
            );
          }
        );
   }

  ngOnInit() {
    this.getAlbumImage();
  }

  getAlbumImage() {
    this.albumService.getAlbums(this.id).subscribe(
      albumResponse => {
        this.album = albumResponse.album;
        localStorage.setItem('album', this.id);
      }
    );
  }

  delAlbum() {
    this.albumService.deleteAlbum(this.id).subscribe(
      delAlbum => {
        this. router.navigate(['showArtist'], { queryParams: {id: this.id } });
      }
    );
  }

  playSong( song) {

    Config.playing = true;
    document.getElementById('mp3-source').setAttribute('src', `${this.url}getSongFile/${song}`);
    const media = document.getElementById('player');
    (media as any).load();
    (media as any).play();
  }

  open() {
    this._modalService.open(  NgbdModalConfirmComponent );
  }

  deleteSong(idSong) {
    this.songService.deleteSong(idSong).subscribe(
      response => { console.log(response); }
    );
  }

}

