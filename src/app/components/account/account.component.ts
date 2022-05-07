import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  notif_activated: boolean;
  public userData: any = {}

  constructor(private serviceUsers: UserService,
              private activeRoute: ActivatedRoute) {
    this.notif_activated = false;
  }

  ngOnInit(): void {
    this.getUserById()
  }
  getUserById(){
    this.activeRoute.params.subscribe(params =>{
      this.userData=this.serviceUsers.getUserById(Number(params['id']))
        .subscribe(response =>{
          this.userData = response
        })
    })
  }
}
