import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddedFavoritesDialogComponent} from "../added-favorites-dialog/added-favorites-dialog.component";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  filtertext:string;
  constructor(public dialog:MatDialog) {

    this.filtertext="Last visit";
  }
  ngOnInit(): void {
  }
  deleteFavorite(): void {
    const dialogRef=this.dialog.open(AddedFavoritesDialogComponent);
  }
  filterLastVisit():void {
    this.filtertext="Last visit";
  }
  filterLastWeek(): void {
    this.filtertext="Last week";
  }
  filterLastMonth(): void {
    this.filtertext="Last month";
  }
  filterAll(): void {
    this.filtertext="All";
  }
}
