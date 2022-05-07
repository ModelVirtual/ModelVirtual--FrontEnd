import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from "../functions/email";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllUsers();
  }
  getAllUsers(): void{
    this.userService.getUsers().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }
  InsertUser(form: any): void{
    let happen = false;
    let id = 0
    this.dataSource.data.map(response => {
      if(response.email === form.email){
        if(response.password === form.password){
          happen = true;
          id = response.id;
        }
      }
    });
    if(happen !== false){
      this.router.navigate([`home/`+id]).then();
    }
    else{
      const dialogRef = this.dialog.open(IsLoginComponent);
    }
  }

}
