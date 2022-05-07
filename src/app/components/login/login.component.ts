import {Component, OnInit, ViewChild} from '@angular/core';
import { MyErrorStateMatcher } from "../functions/email";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Users} from "../../interfaces/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {IsLoginComponent} from "../is-login/is-login.component";
import {MatDialog} from "@angular/material/dialog";
import {Router, Routes} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  productData: Users;
  dataSource: MatTableDataSource<any>
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  cambio: boolean

  //id: number

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('studentForm', {static: true})
  studentForm!: NgForm;

  constructor(private userService: UserService, private dialog: MatDialog,
              private router: Router) {
    this.productData = {} as Users;
    this.dataSource = new MatTableDataSource<any>();
    this.cambio = false;
    //this.id = 0
  }
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
