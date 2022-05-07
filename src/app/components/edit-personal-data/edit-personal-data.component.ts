import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Users} from "../../interfaces/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import { EMPTY, Observable } from 'rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {catchError} from "rxjs/operators";
@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.css']
})
export class EditPersonalDataComponent implements OnInit {

  users_name: string;
  hide_pw: boolean;
  email_valid:FormControl;
  phone_valid:FormControl;
  password_valid:FormControl;
  userData:Observable<Users>|undefined;
  userId:number|undefined;



  constructor(
    private UserService:UserService,private route:ActivatedRoute
  ) {

    this.users_name = "Carolina López";
    this.hide_pw = true;
    this.email_valid=new FormControl('',[Validators.required, Validators.email]);
    this.phone_valid=new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.password_valid=new FormControl('',[Validators.required, Validators.minLength(8)]);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(

      params=>{// @ts-ignore
        this.userId= +params.get('id');}
    );


    // @ts-ignore
    this.userData=this.UserService.getUserByEmail(this.userId)
      .pipe(// @ts-ignore
        catchError(error => {
          console.log('Error',error);
          return EMPTY;
        })
      );
  }
  private isFormValid() : boolean {
    return !this.email_valid.hasError('required') &&
      !this.email_valid.hasError('email') &&
      !this.phone_valid.hasError('required') &&
      !this.phone_valid.hasError('minlength') &&
      !this.password_valid.hasError('required') &&
      !this.password_valid.hasError('minlength');

  }
  edit(mobile:string, mail:string, password:string, notes:string) : void {
    if (this.isFormValid()) {
      let passlength:string="";
      let i:number=1;
      while(i<=password.length) {
        passlength+="*";
        i++;
      }
      alert(`Tus datos: ${mobile} ${mail} ${passlength} ${notes}`);
    }
    else
      alert("You have one or more facts incorrectly. Please, try again.");
  }
  getErrorPhone(): string {
    if (this.phone_valid.hasError('required'))
      return "Please, enter your mobile number";
    return this.phone_valid.hasError('minlength') ? 'Not a valid mobile number' : '';
  }
  getErrorEmail(): string {
    if (this.email_valid.hasError('required'))
      return "Please, enter your email";
    return this.email_valid.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorPassword(): string {
    if (this.password_valid.hasError('required'))
      return "Please, enter your password";
    return this.password_valid.hasError('minlength') ? 'Too short password' : '';
  }
}
