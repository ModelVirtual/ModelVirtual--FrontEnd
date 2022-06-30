import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";
import {Users} from "../../interfaces/user.interface";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  notif_activated: boolean;
  userData: Users;
  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,private tokenService:TokenService) {
    this.notif_activated = false;
    this.userData = {} as Users;
  }

  ngOnInit(): void {
    this.getUserById();
  }
  getUserById() {
    // @ts-ignore
    this.userService.getUserById(Number(this.tokenService.getUserName())).subscribe((response:any)=>{
      this.userData = response;

      console.log(response);
    })
  }
  signOut(){
    this.tokenService.logOut()
  }
}
