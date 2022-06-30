import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Users} from "../../interfaces/user.interface";
import {UsersService} from "../../users/services/users.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public userData: Users;
  time = {
    hour:0,
    minute:0
  }
  constructor(private serviceUsers: UserService,
              private activeRoute: ActivatedRoute,
              private userService: UsersService,
              private tokenService: TokenService) {
    this.userData = {} as Users;
    let dateObj = new Date();
    this.time.hour = dateObj.getHours();
    this.time.minute = dateObj.getMinutes();
  }
  ngOnInit(): void {
    this.getUserById();
  }
  private getCurrentUser(): void {
    //@ts-ignore
    this.userData = this.userService.getCurrentUser();
    console.log(this.userData);
  }

  private getUserById() {
    // @ts-ignore
    this.userService.getUserById(Number(this.tokenService.getUserName())).subscribe((response:any)=>{
      this.userData = response;
      if(this.userData.profileImage == ""){
        this.userData.profileImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png";
      }
    })
  }
}
