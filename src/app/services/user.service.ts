import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../interfaces/user.interface";
import {map, retry, shareReplay} from "rxjs/operators";
import {Product} from "../interfaces/product.interface";
import {ResponseInterface} from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = 'http://localhost:3000/users'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': "application/json"})
  }
  constructor(private  http: HttpClient) { }
  users$=this.getUsers().pipe(shareReplay(1));

  getAll():Observable<Product>{
    return this.http.get<Product>(this.apiURL, this.httpOptions)
  }
  loginByEmail(form: Users):Observable<ResponseInterface>{
    return this.http.post<ResponseInterface>(this.apiURL, form);
  }
  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.apiURL);
  }
  getUserById(id:number) {
    return this.users$.pipe(map(product=>product.find(p=>p.id===id)));
  }
  create(item: any): Observable<Product>{
    return this.http.post<Product>(this.apiURL, JSON.stringify(item), this.httpOptions).
      pipe(
        retry(2)
    )
  }
  delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`, this.httpOptions).pipe(
      retry(2)
    )
  }
}
