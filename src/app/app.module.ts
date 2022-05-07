import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { RegisterComponent } from './components/register/register.component';
import { ForgotYourPasswordComponent } from './components/forgot-your-password/forgot-your-password.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { EditPersonalDataComponent } from './components/edit-personal-data/edit-personal-data.component';
import { DeletedFavoritesDialogComponent } from './components/deleted-favorites-dialog/deleted-favorites-dialog.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ProductsComponent } from "./components/products/products.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { ProductService } from "./services/product.service";
import { AddedFavoritesDialogComponent } from './components/added-favorites-dialog/added-favorites-dialog.component';
import { IsLoginComponent } from './components/is-login/is-login.component';
import { ShoplistComponent } from "./components/shoplist/shoplist.component";
import { QrcodeComponent } from './components/qrcode/qrcode.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'forgotYourPassword', component: ForgotYourPasswordComponent},
  { path: 'home/:id', component: HomeComponent},
  { path: 'account/:id', component: AccountComponent},
  { path: 'account/edit-data/:id', component: EditPersonalDataComponent},
  { path: 'product/:id', component: ProductsComponent},
  { path: 'product-details/:id',component:ProductDetailsComponent},
  { path: 'favorites/:id', component: FavoritesComponent},
  { path: 'shoplist/:id', component: ShoplistComponent},
  { path: 'qrcode/:id', component: QrcodeComponent},

  {path:'product-details/:id',component:ProductDetailsComponent},
  { path: 'favorites/:id', component: FavoritesComponent}
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
    DeletedFavoritesDialogComponent,
    ProductsComponent,
    ProductDetailsComponent,
    FavoritesComponent,
    AddedFavoritesDialogComponent,
    ShoplistComponent,
    IsLoginComponent,
    QrcodeComponent
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
