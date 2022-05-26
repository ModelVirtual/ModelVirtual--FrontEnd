import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, Subject, Subscription} from "rxjs";
import {CommentsService} from "../../services/comments.service";
import {CommentInterface} from "../../interfaces/comment.interface";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../users/services/users.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import{Users} from "../../interfaces/user.interface";

@Component({
  selector: 'app-coments-box',
  templateUrl: './coments-box.component.html',
  styleUrls: ['./coments-box.component.css']
})
export class ComentsBoxComponent implements OnInit {
  productId:number|undefined;
  //private Comments=new BehaviorSubject<CommentInterface[]>([]);
  //Comments$=this.Comments.asObservable();
  userDataCurrent: any = {};
  hideButton:boolean=true;
  initialText:string='';
  CommentCurrent:CommentInterface|undefined;
  form!:FormGroup;
  arrayComments:CommentInterface[]=[]

  constructor(
      private route:ActivatedRoute,
      private commentService:CommentsService,
      private userService:UsersService,
      private fb:FormBuilder
  ) {
      this.route.paramMap.subscribe(
          params => {
              // @ts-ignore
              this.productId= +params.get('id');
          }
      );
      this.form=this.fb.group({
          description:[this.initialText,Validators.required],
      });

  }


  ngOnInit(): void {
    this.getUser();
    this.getComments();
    this.commentService.refresh$.subscribe(response=>{
        this.getComments();
        console.log("FFFFFFFFFFFF");

    });
  }
  getComments(){
      // @ts-ignore
      //this.Comments$=this.commentService.getCommentsByProductId(this.productId);
      this.commentService.getCommentsByProductId(this.productId).subscribe(data => {
          this.arrayComments=data;
      });
  }
  getUserById(id:number){
      // @ts-ignore
      return this.userService.getUserById(id);

  }
  getUser(){
      // @ts-ignore
      this.userDataCurrent = JSON.parse(this.userService.getCurrentUser());
      console.log(this.userDataCurrent);
  }
  sentComment(){
      this.FillCommentCurrent();
      // @ts-ignore
      this.commentService.createComments(this.CommentCurrent).subscribe((response: any)=> {
          // @ts-ignore
          this.arrayComments.push(response);
          console.log("exito");
          this.form.reset();

      });
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
