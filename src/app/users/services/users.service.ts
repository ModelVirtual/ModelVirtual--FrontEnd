import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Users} from "../../interfaces/user.interface";
import {catchError, map, retry, shareReplay} from "rxjs/operators";
import {apiLink} from "../../services/http-common";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  basePath = `${apiLink}/users/auth`;
  apiURL = `${apiLink}/users`;
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': "application/json"})
  }
  users$=this.getUsers().pipe(shareReplay(1));
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.apiURL, this.httpOptions);
  }
  getUserById(id:number):Observable<Users>  {
    return this.http.get<Users>(`${this.apiURL}/${id}`, this.httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError));
  }
  singIn(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiURL}/auth/sign-in`, user).pipe(
      retry(2), catchError(this.handleError)
    )
  }
  signUp(user: Users): Observable<Users>{
    return this.http.post<Users>(`${this.apiURL}/auth/sign-up`, user)
      .pipe(retry(2), catchError(this.handleError));
  }
  setCurrentUser(user: string){
    localStorage.setItem('user', user);
  }
  getCurrentUser(){
    return localStorage.getItem('user');
  }

}
