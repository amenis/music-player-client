import { Component, OnInit } from '@angular/core';
import { Config } from '../../../services/config';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { promise } from 'protractor';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userEdit: User;
  public identity;
  public token;
  public errorMessage;
  public fileToUpload: Array<File>;
  url: string;

  constructor( private userService: UserService) {
    // this.userEdit = new User('', '' , '' , '' , '' , 'ROLE_USER' , '');
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.userEdit = this.identity;
    this.url = Config.url;
  }

  ngOnInit() {
    //console.log(this.userEdit);
  }

  onSubmit() {
    this.userService.update_user(this.userEdit).subscribe(
      response => {
        this.userEdit = response.user;
        if ( !response.user ) {
          this.errorMessage = 'el usuario no se ha actualizado';
        } else {
           this.userEdit = response.user;
           // localStorage.setItem( 'identity', JSON.stringify(this.userEdit) );
          if (!this.fileToUpload) {
            // redirect
          } else {
            this.makeFileRequest(`${this.url}uploadImage/${this.userEdit._id}`, [], this.fileToUpload)
            .then( (result: any) => {
                this.userEdit.image = result.image;
                localStorage.setItem( 'identity', JSON.stringify(this.userEdit) );
                console.log(this.userEdit);
            } );
          }
          this.errorMessage = 'Datos Actualizados Correctamente';
        }
      },
       error => {
        const errorMessage = <any>error;
        if ( errorMessage != null ) {
          const body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <Array <File> >fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    const token  = this.token;
    return new Promise( ( resolve, reject ) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          }
        } else {
          reject(xhr.response);
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    } );
  }

}
