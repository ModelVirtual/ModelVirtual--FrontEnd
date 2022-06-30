import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, Subject, Subscription} from "rxjs";
import {CommentsService} from "../../services/comments.service";
import {CommentInterface} from "../../interfaces/comment.interface";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../users/services/users.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import{Users} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";

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
  arrayComments:CommentInterface[]=[];
  arrayUsersComment: Users[]=[];

  constructor(
    private route:ActivatedRoute,
    private commentService:CommentsService,
    private userService:UsersService,
    private fb:FormBuilder,
    private tokenService: TokenService
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
  }
  getComments(){
    // @ts-ignore
    //this.Comments$=this.commentService.getCommentsByProductId(this.productId);
    this.commentService.getCommentsByProductId(this.productId).subscribe(data => {
      this.arrayComments=data;
      this.getUserById(data);
    });
  }
  getUserById(data: any){
    // @ts-ignore
    data.map((c)=>{
      let user = this.userService.getUserById(c.user_id).subscribe(u=>{
        this.arrayUsersComment.push(u);
      })
    })
  }
  getUser(){
    // @ts-ignore
    this.userService.getUserById(Number(this.tokenService.getUserName())).subscribe((response:any)=>{
      this.userDataCurrent = response;
    })
  }
  sentComment(){
    this.FillCommentCurrent();
    // @ts-ignore
    this.commentService.createComments(this.CommentCurrent).subscribe((response: any)=> {
      console.log(response);
      // @ts-ignore
      this.arrayComments.push(response);
      this.form.reset();
      this.userService.getUserById(Number(this.tokenService.getUserName())).subscribe((response:any)=>{
        this.arrayUsersComment.push(response);
      })
    });
  }

  FillCommentCurrent(){
    this.CommentCurrent={
      description: this.form.value.description,
      user_id: this.userDataCurrent.id,
      // @ts-ignore
      product_id: this.productId,
      date:new Date().toDateString()
    }
  }
  cancelButton(){
    this.hideButton=false;
    this.form.reset();
  }

}

