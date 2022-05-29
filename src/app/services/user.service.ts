import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Users} from "../interfaces/user.interface";
import {catchError, map, retry, shareReplay} from "rxjs/operators";
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

  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.apiURL, this.httpOptions);
  }
  getUserById(id:number):Observable<Users>  {
    //console.log(id);
    return this.http.get<Users>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getUserByEmail(email: string) {
    return this.users$.pipe(map(product=>product.find(p=>p.email===email)));
  }
  update(id: any, item: any): Observable<Users> {
    return this.http.put<Users>(`${this.apiURL}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  handleError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Error ocurred: ${error.error.message}`);
    } else {
      console.error(`Fake backend returned: ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try later.'));
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
