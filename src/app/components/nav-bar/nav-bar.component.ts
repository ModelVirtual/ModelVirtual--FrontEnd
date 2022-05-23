import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public userData: any = {};
  time = {
    hour:0,
    minute:0
  }
  constructor(private serviceUsers: UserService,
              private activeRoute: ActivatedRoute) {
    let dateObj = new Date();
    this.time.hour = dateObj.getHours();
    this.time.minute = dateObj.getMinutes();
  }
  ngOnInit(): void {

  }
}
