import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EMPTY, Observable, Subject} from "rxjs";
import {CommentsService} from "../../services/comments.service";
import {CommentInterface} from "../../interfaces/comment.interface";
import {ActivatedRoute} from "@angular/router";
import {catchError} from "rxjs/operators";
import {UsersService} from "../../users/services/users.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Users} from "../../interfaces/user.interface";

@Component({
  selector: 'app-coments-box',
  templateUrl: './coments-box.component.html',
  styleUrls: ['./coments-box.component.css']
})
export class ComentsBoxComponent implements OnInit {
  productId:number|undefined;
  comments: CommentInterface[] | undefined;
  Comments$:Observable<CommentInterface[]>|undefined;
  userDataCurrent: any = {};
  hideButton:boolean=true;
  initialText:string='';
  CommentCurrent:CommentInterface|undefined;


  form!:FormGroup;

  constructor(
      private route:ActivatedRoute,
      private commentService:CommentsService,
      private userService:UsersService,
      private fb:FormBuilder
  ) {

  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
        params => {
          // @ts-ignore
          this.productId= +params.get('id');
        }
    );
    this.getComments();
    this.getUser();
    this.form=this.fb.group({
        description:[this.initialText,Validators.required],
    });


  }
  getComments(){
    // @ts-ignore
    // @ts-ignore
      this.Comments$=this.commentService.getCommentsByProductId(this.productId).    // @ts-ignore
    pipe(// @ts-ignore
        catchError(error =>{
          console.log('Error:',error);
          return EMPTY;
        })
    );

  }
  getUserById(id:number){
      // @ts-ignore
      return this.userService.getUserById(id);
  }
  getUser(){
      // @ts-ignore
      this.userDataCurrent = JSON.parse(this.userService.getCurrentUser())
      console.log(this.userDataCurrent)
  }
  sentComment(){
      this.FillCommentCurrent();
      this.commentService.createComments(this.CommentCurrent).subscribe((response: any) =>{
          console.log(response);
      });

      this.form.reset();
  }
  FillCommentCurrent(){
      this.CommentCurrent={
          description: this.form.value.description,
          userId: this.userDataCurrent.id,
          // @ts-ignore
          ProductId: this.productId,
          Date:new Date().toDateString()

      }
  }
  cancelButton(){
      this.hideButton=false;
      this.form.reset();
  }



}
