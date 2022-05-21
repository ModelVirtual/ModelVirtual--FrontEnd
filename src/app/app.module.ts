import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import { EditPersonalDataComponent } from './components/edit-personal-data/edit-personal-data.component';
import {DeletedFavoritesDialogComponent} from './components/deleted-favorites-dialog/deleted-favorites-dialog.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {ProductService} from "./services/product.service";
import { AddedFavoritesDialogComponent } from './components/added-favorites-dialog/added-favorites-dialog.component';
import { IsLoginComponent } from './components/is-login/is-login.component';
import {ShoplistComponent} from "./components/shoplist/shoplist.component";
import { ComentsBoxComponent } from './components/coments-box/coments-box.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { ForgotPasswordComponent } from './users/pages/forgot-password/forgot-password.component';
import { SignInComponent } from './users/pages/sign-in/sign-in.component';
import { SignUpComponent } from './users/pages/sign-up/sign-up.component';
import { IsLognupComponent } from './components/is-lognup/is-lognup.component';

const routes: Routes = [
  { path: 'register', component: SignUpComponent },
  { path: '', component: SignInComponent },
  { path: 'forgotYourPassword', component: ForgotPasswordComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home/account', component: AccountComponent},
  { path: 'home/account/edit-data', component: EditPersonalDataComponent},
  { path: 'product/:id', component: ProductsComponent},
  {path:'product-details',component:ProductDetailsComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: 'qrcode', component: QrcodeComponent},
  { path: 'shoplist', component: ShoplistComponent},
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AccountComponent,
    EditPersonalDataComponent,
    DeletedFavoritesDialogComponent,
    ProductsComponent,
    ProductDetailsComponent,
    FavoritesComponent,
     AddedFavoritesDialogComponent,
    ShoplistComponent,
     IsLoginComponent,
     ComentsBoxComponent,
    QrcodeComponent,
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
    IsLognupComponent
  ],
  imports: [
    BrowserModule,
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
    MatCardModule,
    HttpClientModule,
    MatMenuModule,

    MatGridListModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
