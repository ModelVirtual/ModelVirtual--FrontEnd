import {Component, Input, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {EMPTY, Observable} from "rxjs";
import {Users} from "../../interfaces/user.interface";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
