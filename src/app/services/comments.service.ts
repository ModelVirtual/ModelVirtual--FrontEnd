import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {shareReplay, map, retry, catchError, tap} from 'rxjs/operators';
import {CommentInterface} from "../interfaces/comment.interface";
import {BehaviorSubject, Observable, Subject, throwError} from "rxjs";
import {apiLink} from "./http-common";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiURL=`${apiLink}/comments`;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  comment$=this.getComments().pipe(shareReplay(1));
  private _refresh$=new Subject<void>();

  constructor(private  http: HttpClient) { }

  handleError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Error ocurred: ${error.error.message}`);
    } else {
      console.error(`RESTful API returned: ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try later.'));
  }

  get refresh$(){
    return this._refresh$;
  }

  getComments():Observable<CommentInterface[]>{
    return this.http.get<CommentInterface[]>(this.apiURL);
  }
  getCommentsByProductId(id:number):Observable<CommentInterface[]>{
    return this.comment$.pipe(
        map(comment=>comment.filter(c=>c.ProductId===id)),
        retry(2),
        catchError(this.handleError));
  }
  createComments(item:any):Observable<CommentInterface>{
    return this.http.post<CommentInterface>(this.apiURL, item)
        .pipe(
            tap(()=>{
              this._refresh$.next();
            })
        );

  }


}
