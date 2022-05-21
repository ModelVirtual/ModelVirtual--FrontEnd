import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../components/functions/email";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup
  constructor(private userService: UsersService, public builder: FormBuilder,
              private router: Router) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {

  }
  InsertUser(){
    this.userService.singIn(this.loginForm.value).subscribe((res:any) =>{
      this.userService.setCurrentUser(JSON.stringify(res.user));
      console.log(res.user);
      this.loginForm.reset();
      this.router.navigate(['home']).then();
    })
  }
}
