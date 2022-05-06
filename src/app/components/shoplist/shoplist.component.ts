import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/product.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {FavoriteService} from "../../services/favorite.service";
import {DeletedFavoritesDialogComponent} from "../deleted-favorites-dialog/deleted-favorites-dialog.component";

@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.css']
})
export class ShoplistComponent implements OnInit {

  filtertext:string;
  favoriteData: Product;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  /*@ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;*/
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog:MatDialog, private favoriteService:FavoriteService) {
    this.filtertext="Last visit";
    this.displayedColumns = ['id', 'name', 'price', 'brand', 'image', 'size'];
    this.favoriteData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
  }
  ngOnInit(): void {
    this.getAllFavorites();
    //this.dataSource.paginator=this.paginator;
  }
  getAllFavorites(): void{
    this.favoriteService.getAll().subscribe((response: any)=>{
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
