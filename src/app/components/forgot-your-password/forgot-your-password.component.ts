import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../functions/email";
import {UserService} from "../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Users} from "../../interfaces/user.interface";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-forgot-your-password',
  templateUrl: './forgot-your-password.component.html',
  styleUrls: ['./forgot-your-password.component.css']
})
export class ForgotYourPasswordComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  userData: Users;
  email: string = "";
  password: string = "";
  confirmPassword: string = ""

  @ViewChild(MatPaginator, {static: true})
  paginator!:MatPaginator;
  @ViewChild('userForm', {static: true})
  userForm!: NgForm;

  constructor(private userService: UserService) {
    this.userData = {} as Users;
    this.dataSource = new MatTableDataSource<any>();
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator
    this.getAllUsers()
  }
  checkForgotPassword(){
    this.getUserById();
    this.updateUser();
  }
  getAllUsers (){
    this.userService.getUsers().subscribe((response: any) =>{
      this.dataSource.data = response;
      console.log(this.dataSource.data)
    })
  }
  getUserById():void{
    this.userService.getUserByEmail(this.email).subscribe((response:any) =>{
      this.userData = response;
      console.log(this.userData)
    })
  }
  updateUser():void{
    if(this.password === this.confirmPassword && this.userData.email === this.email){
      this.userData.password = this.password;
      console.log(this.userData.id);
      this.userService.update(this.userData.id, this.userData).subscribe((response:any)=>{
        this.dataSource.data = this.dataSource.data.map((o: Users) =>{
          if (o.id === response.id) {
            o = response;
          }
          return o;
        });
      })
    }
  }
}
