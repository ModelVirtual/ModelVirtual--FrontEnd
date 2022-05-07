import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import {Product} from "../interfaces/product.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL='https://my-json-server.typicode.com/mauripradoch/json-modelvirtual/products';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private  http: HttpClient) { }
  products$=this.getProducts().pipe(shareReplay(1));

  getAll():Observable<Product>{
    return this.http.get<Product>(this.apiURL, this.httpOptions);
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL);
  }


  getProductById(id:number) {
    return this.products$.pipe(map(product=>product.find(p=>p.id===id)));//(`${this.apiURL}?id=${id}`,this.httpOptions);
  }
}
