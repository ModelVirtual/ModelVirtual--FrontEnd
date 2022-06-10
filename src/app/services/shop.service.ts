import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Shop} from "../interfaces/shop.interface";
import {catchError, retry} from "rxjs/operators";
import {Product} from "../interfaces/product.interface";
import {apiLink} from "./http-common";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  basePath=`${apiLink}/shops`;
  httpOptions= {
    headers:new HttpHeaders({'Content-Type' : 'application/json'})
  }
  constructor(private http: HttpClient) { }
  handleError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Error ocurred: ${error.error.message}`);
    } else {
      console.error(`RESTful API returned: ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try later.'));
  }
  getAll():Observable<Shop> {
    return this.http.get<Shop>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getAllProductsById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.basePath}/${id}/products`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
