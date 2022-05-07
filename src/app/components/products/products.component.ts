import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/product.interface";
import {ProductService} from "../../services/product.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {FavoriteService} from "../../services/favorite.service";
import {AddedFavoritesDialogComponent} from "../added-favorites-dialog/added-favorites-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productData:Product;
  dataSource:MatTableDataSource<any>
  displayedColumns: string[] = ['id', 'name', 'price', 'brand', 'image', 'size'];

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('studentForm', {static: true})
  studentForm!: NgForm;

  constructor(private productService: ProductService, private favoriteService: FavoriteService, public dialog:MatDialog) {
    this.productData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllProducts();
  }
  getAllProducts(): void{
    this.productService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
    console.log(this.dataSource.data);
  }
  private isAddedToFavorites(id: number): boolean {
    let i:number=0;
    let temp: MatTableDataSource<any>=new MatTableDataSource<any>();
    this.favoriteService.getAll().subscribe((response: any) => {
      temp.data = response;
    });
    while(i++<temp.data.length)
        if (id==temp.data[i].id)
          return true;
    return false;
  }
  addToFavorites(id: number): void {
    this.favoriteService.create(this.dataSource.data[id - 1]).subscribe((response: any) => {
      console.log(response);
      const dialogRef=this.dialog.open(AddedFavoritesDialogComponent);
    });
  }




}
