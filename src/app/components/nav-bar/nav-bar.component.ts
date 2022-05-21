import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public userData: any = {}
  constructor(private serviceUsers: UserService,
              private activeRoute: ActivatedRoute) {

  }
  ngOnInit(): void {

  }
}
