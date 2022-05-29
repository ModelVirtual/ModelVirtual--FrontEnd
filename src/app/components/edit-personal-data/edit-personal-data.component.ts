import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Users} from "../../interfaces/user.interface";
@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.css']
})
export class EditPersonalDataComponent implements OnInit {

  hide_pw: boolean;
  email_valid:FormControl;
  phone_valid:FormControl;
  password_valid:FormControl;
  first_name_valid:FormControl;
  last_name_valid:FormControl;
  userData: Users;
  userId:number;
  userFullName: string;



  constructor(
    private userService:UserService
  ) {
    this.hide_pw = true;
    this.userId = -1;
    this.email_valid=new FormControl('',[Validators.required, Validators.email]);
    this.first_name_valid = new FormControl('', [Validators.required]);
    this.last_name_valid = new FormControl('', [Validators.required]);
    this.phone_valid=new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.password_valid=new FormControl('',[Validators.required, Validators.minLength(8)]);
    this.userData = {} as Users;
    this.userFullName = "";
  }

  ngOnInit(): void {
    this.getUserId();
    this.getUserData();
  }
  private isFormValid() : boolean {
    return !this.email_valid.hasError('required') &&
      !this.email_valid.hasError('email') &&
      !this.phone_valid.hasError('required') &&
      !this.phone_valid.hasError('minlength') &&
      //!this.password_valid.hasError('required') &&
      //!this.password_valid.hasError('minlength') &&
      !this.first_name_valid.hasError('required') &&
      !this.last_name_valid.hasError('required');

  }
  private getUserId(): void {
    // @ts-ignore
      this.userId = +sessionStorage.getItem('userId');
  }
  private getUserData() : void {
    this.userService.getUserById(this.userId).subscribe((response: any) => {
      this.userData = response;
      this.userData.password = "";
      this.userFullName = response.firstName + ' ' + response.lastName;
      console.log(response);
    })
  }
  edit() : void {
    if (this.isFormValid()) {
      this.userService.update(this.userId, this.userData).subscribe((response: any) => {
        console.log(response);
      })
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
  getErrorFirstName(): string {
    if (this.first_name_valid.hasError('required'))
      return "Please, enter your first name";
    return "";
  }
  getErrorLastName(): string {
    if (this.last_name_valid.hasError('required'))
      return "Please, enter your last name";
    return "";
  }
}
