import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../components/functions/email";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  roles: string[] = [];
  loginForm: FormGroup
  constructor(private userService: UsersService, public builder: FormBuilder,
              private router: Router,private tokenService:TokenService) {
    this.loginForm = this.builder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  usernameFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.roles = this.tokenService.getAuthorities();
    }

  }
  InsertUser(){
    this.userService.singIn(this.loginForm.value).subscribe((res:any) =>{
      this.tokenService.setToken(res.token);
      this.tokenService.setUserName(res.id);
      this.tokenService.setAuthorities(res.roles);
      this.roles=res.roles;
      this.loginForm.reset();
      this.router.navigate(['home']).then();
    }
    );
  }
}
