import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Users} from "../../interfaces/user.interface";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.css']
})
export class EditPersonalDataComponent implements OnInit {

  email_valid:FormControl;
  profile_pic_valid:FormControl;
  first_name_valid:FormControl;
  last_name_valid:FormControl;
  userData: Users;
  userModel: Users;
  userId:number;
  userFullName: string;



  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private router: Router
  ) {
    this.userId = -1;
    this.email_valid=new FormControl('',[Validators.required, Validators.email, Validators.maxLength(50)]);
    this.first_name_valid = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.last_name_valid = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    this.profile_pic_valid=new FormControl('', [Validators.maxLength(250)]);
    this.userData = {} as Users;
    this.userModel = {} as Users;
    this.userFullName = "";
  }

  ngOnInit(): void {
    //this.getUserId();
    this.getUserData();
  }
  private isFormValid() : boolean {
    return !this.email_valid.hasError('required') &&
      !this.email_valid.hasError('email') &&
      !this.email_valid.hasError('maxLength') &&
      !this.profile_pic_valid.hasError('maxlength') &&
      //!this.password_valid.hasError('required') &&
      //!this.password_valid.hasError('minlength') &&
      !this.first_name_valid.hasError('required') &&
      !this.first_name_valid.hasError('maxLength') &&
      !this.last_name_valid.hasError('required') &&
      !this.last_name_valid.hasError('maxLength');;

  }
  private getUserId(): void {
    // @ts-ignore
      this.userId = +sessionStorage.getItem('userId');
  }
  private getUserData() : void {
    this.userService.getUserById(Number(this.tokenService.getUserName())).subscribe((response: any) => {
      this.userData = response;
      this.userModel = JSON.parse(JSON.stringify(response));
      this.userFullName = response.firstName + ' ' + response.lastName;
      this.userId = response.id;
      console.log(response);
    })
  }
  edit() : void {
    if (this.isFormValid()) {
      this.userService.update(this.userId, this.userModel).subscribe((response: any) => {
        console.log(response);
      });
      if(this.userModel.username!=this.userData.username)
        this.router.navigate([""]);
      else
        this.router.navigate(["home","account"]);
    }
    else
      alert("You have one or more facts incorrectly. Please, try again.");
  }
  getErrorProfilePic(): string {
    if (this.profile_pic_valid.hasError('maxLength'))
      return "Max length error";
    else return "";
  }
  getErrorEmail(): string {
    if (this.email_valid.hasError('required'))
      return "Please, enter your email";
    return this.email_valid.hasError('email') ? 'Not a valid email' : '';
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
