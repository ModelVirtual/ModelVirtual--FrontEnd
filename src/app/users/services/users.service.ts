import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Users} from "../../interfaces/user.interface";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  basePath = 'http://localhost:3000/api/v1/'
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': "application/json"})
  }
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
    return this.http.get<Users[]>(`${this.basePath}users`, this.httpOptions)
  }
  singIn(user: Users): Observable<Users>{
    return this.http.post<Users>(`${this.basePath}sign-in`, user).pipe(
      retry(2), catchError(this.handleError)
    )
  }
  signUp(user: Users): Observable<Users>{
    return this.http.post<Users>(`${this.basePath}sign-up`, user)
      .pipe(retry(2), catchError(this.handleError));
  }
  setCurrentUser(user: string){
    localStorage.setItem('user', user);
  }
  getCurrentUser(){
    return localStorage.getItem('user');
  }
  signOut(){
    localStorage.removeItem('user');
  }
}
