import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {shareReplay, map, retry, catchError} from 'rxjs/operators';
import {CommentInterface} from "../interfaces/comment.interface";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  apiURL='http://localhost:3000/comments';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private  http: HttpClient) { }

  handleError(error:HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Error ocurred: ${error.error.message}`);
    } else {
      console.error(`RESTful API returned: ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try later.'));
  }

  comment$=this.getComments().pipe(shareReplay(1));

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
    return this.http.post<CommentInterface>(this.apiURL,JSON.stringify(item),this.httpOptions)
        .pipe(
            retry(2)
        );
  }


}
