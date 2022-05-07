import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../functions/email";
import {UserService} from "../../services/user.service";
import {Users} from "../../interfaces/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  productUser: Users;
  prueba= "";
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, {static: true})
  paginator!:MatPaginator;
  @ViewChild('userForm', {static: true})
  userForm!: NgForm;

  constructor(private userService: UserService) {
   this.productUser = {} as Users;
   this.dataSource = new MatTableDataSource<any>();
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllUsers()
  }
  getAllUsers(){
    this.userService.getUsers().subscribe((response: any) =>{
      this.dataSource.data = response;
    })
    this.productUser.year = 0;
    this.productUser.ProfileImage = "";
  }
  insertUser(){
    var dataFirstName = document.getElementById('valueId');

    this.userService.create(this.productUser).subscribe((response: any) =>{
      console.log(response);
    })
  }
}
