import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { RegisterComponent } from './components/register/register.component';
import { ForgotYourPasswordComponent } from './components/forgot-your-password/forgot-your-password.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import { EditPersonalDataComponent } from './components/edit-personal-data/edit-personal-data.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'forgotYourPassword', component: ForgotYourPasswordComponent},
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  { path: 'account/edit-data', component: EditPersonalDataComponent},
  { path: 'favorites', component: FavoritesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotYourPasswordComponent,
    HomeComponent,
    NavBarComponent,
    AccountComponent,
    EditPersonalDataComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
