import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  notif_activated: boolean;
  users_name: string;

  constructor() {
    this.notif_activated = false;
    this.users_name = "Carolina López";
  }

  ngOnInit(): void {
  }
}
