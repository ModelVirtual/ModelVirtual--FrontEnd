import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeletedFavoritesDialogComponent} from "../deleted-favorites-dialog/deleted-favorites-dialog.component";
import {FavoriteService} from "../../services/favorite.service";
import {Product} from "../../interfaces/product.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  filtertext:string;
  favoriteData: Product;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  userId: number;

  /*@ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;*/
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog:MatDialog, private favoriteService:FavoriteService) {
    this.filtertext="Last visit";
    this.displayedColumns = ['id', 'name', 'price', 'brand', 'image', 'size'];
    this.favoriteData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
    this.userId = -1;
  }
  ngOnInit(): void {
    this.getUserId();
    this.getAllFavorites();
    //this.dataSource.paginator=this.paginator;
  }
  private getUserId(): void {
    // @ts-ignore
    this.userId = +sessionStorage.getItem('userId');
  }
  getAllFavorites(): void{
    this.favoriteService.getAllByUserId(this.userId).subscribe((response: any)=>{
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
  }

  deleteFavorite(id: number): void {
    this.favoriteService.delete(id).subscribe(() => {
      console.log(`Deleting favorite with id: ${id}`);
      this.dataSource.data = this.dataSource.data.filter((o: Product) => {
        return o.id !== id ? o : false;
      });
      console.log(this.dataSource.data);
    })
    const dialogRef=this.dialog.open(DeletedFavoritesDialogComponent);
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
