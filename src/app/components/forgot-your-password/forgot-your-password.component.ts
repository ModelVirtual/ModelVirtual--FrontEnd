import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../functions/email";

@Component({
  selector: 'app-forgot-your-password',
  templateUrl: './forgot-your-password.component.html',
  styleUrls: ['./forgot-your-password.component.css']
})
export class ForgotYourPasswordComponent implements OnInit {

  constructor() { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
  }

}
