import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserEditComponent } from './views/user/user-edit/user-edit.component';
import { LoginComponent } from './views/init/login/login.component';
import { RegisterUserComponent } from './views/init/register/register-user/register-user.component';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';

import { UserService } from './services/user.service';
import { GuardService } from './services/guard.service';
import { HeaderComponent } from './views/headers/header/header.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterUserComponent },
  { path: 'editUser/:id', component: UserEditComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    LoginComponent,
    RegisterUserComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
