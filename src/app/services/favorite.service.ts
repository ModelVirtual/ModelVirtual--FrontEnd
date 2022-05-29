import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, retry, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";
import {Product} from "../interfaces/product.interface";
import {Favorite} from "../interfaces/favorite.interface";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  apiURL='http://localhost:3000/favorites';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private  http: HttpClient) { }
  favorites$=this.getFavorites().pipe(shareReplay(1));

  getAll():Observable<Favorite>{
    return this.http.get<Favorite>(this.apiURL, this.httpOptions);
  }
  getAllByUserId(userId: number): Observable<Favorite> {
    return this.http.get<Favorite>(`${this.apiURL}/user/${userId}`, this.httpOptions);
  }

  getFavorites():Observable<Favorite[]>{
    return this.http.get<Favorite[]>(this.apiURL);
  }

  create(item: any, userId: number): Observable<Favorite> {
    item.userId = userId;
    item.productId = item.id;
    item.id = 0;
    return this.http.post<Favorite>(this.apiURL, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2)
      );
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        retry(2));
  }
}
