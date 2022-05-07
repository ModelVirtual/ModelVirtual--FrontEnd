import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, retry, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";
import {Product} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  apiURL='https://my-json-server.typicode.com/mauripradoch/json-modelvirtual/favorites';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private  http: HttpClient) { }
  favorites$=this.getFavorites().pipe(shareReplay(1));

  getAll():Observable<Product>{
    return this.http.get<Product>(this.apiURL, this.httpOptions);
  }

  getFavorites():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL);
  }

  getProductById(id:number) {
    return this.favorites$.pipe(map(product=>product.find(p=>p.id===id)));
  }

  create(item: any): Observable<Product> {
    return this.http.post<Product>(this.apiURL, JSON.stringify(item), this.httpOptions)
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
