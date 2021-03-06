import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../components/functions/email";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../../services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {IsLognupComponent} from "../../../components/is-lognup/is-lognup.component";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  loginForm: FormGroup;
  dataUsers = []
  confirmPassword = ""

  @ViewChild('userForm', {static: false})
  userForm!: NgForm;
  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private userService: UsersService,
              private dialog: MatDialog,
              private builder: FormBuilder,
              private router: Router) {
    this.loginForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profileImage: ['', Validators.required],
      year: ['', Validators.required],
      confirmPassword: ['']
    })
  }
  matcher = new MyErrorStateMatcher();
  get username() { return this.loginForm.controls['username'];}
  ngOnInit(): void {
    this.getAllUsers()
    console.log(this.dataUsers)
  }
  getAllUsers(){
    this.userService.getUsers().subscribe((response: any) => {
      this.dataUsers = response
    })
  }
  insertUser(form: any){
    let insert = true;
    if(this.loginForm.value.password.length < 6 &&
      this.userForm.form.valid && this.confirmPassword === this.loginForm.value.password){
      const dialogRef = this.dialog.open(IsLognupComponent);
    }else{
      this.dataUsers.map((res) =>{
        // @ts-ignore
        if(res.username === this.loginForm.value.username){
          insert = false;
        }
      })
      if(insert){
        console.log(this.loginForm.value)
        this.loginForm.value.profileImage = "";
        this.userService.signUp(this.loginForm.value).subscribe((response: any) =>{
          console.log(response);
          this.router.navigate([""]);
        })
      }else{
        const dialogRef = this.dialog.open(IsLognupComponent);
      }
    }
  }
}
