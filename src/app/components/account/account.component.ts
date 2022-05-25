import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../users/services/users.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  notif_activated: boolean;
  public userData: any = {}

  constructor(private userService: UsersService,
              private activeRoute: ActivatedRoute) {
    this.notif_activated = false;
  }

  ngOnInit(): void {
    this.getUserById()
  }
  getUserById() {
    // @ts-ignore
    this.userData = JSON.parse(this.userService.getCurrentUser())
    console.log(this.userData)
  }
  signOut(){
    this.userService.signOut()
  }
}
