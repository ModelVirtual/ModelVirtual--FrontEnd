import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/product.interface";
import {MatTableDataSource} from "@angular/material/table";
import {FavoriteService} from "../../services/favorite.service";
import {AddedFavoritesDialogComponent} from "../added-favorites-dialog/added-favorites-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productData:Product;
  dataSource:MatTableDataSource<any>
  displayedColumns: string[] = ['id', 'name', 'price', 'brand', 'image', 'size'];
  shopId: number;
  userId: number;
  constructor(private favoriteService: FavoriteService, public dialog:MatDialog,
              private route: ActivatedRoute, private shopService:ShopService) {
    this.productData = {} as Product;
    this.dataSource = new MatTableDataSource<any>();
    this.shopId = -1;
    this.userId = -1;
  }

  ngOnInit() {
    this.getUserId();
    this.getShopId();
    this.getProductsByShopId();
  }
  private getUserId(): void {
    // @ts-ignore
    this.userId = +sessionStorage.getItem('AuthUserName');
    console.log(this.userId);
  }
  private getShopId(): void {
    this.route.paramMap.subscribe((params)=> {
      // @ts-ignore
      this.shopId = +params.get('id');
    })
  }
  getProductsByShopId(): void {
    this.shopService.getAllProductsById(this.shopId).subscribe((response: any)=>{
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
    console.log(id);
    console.log(this.dataSource.data);
    let identify = -1;
    let i = 0;
    this.dataSource.data.map((res)=>{
      if(res.id === id){
          this.favoriteService.create(this.dataSource.data[i], this.userId).subscribe((response: any) => {
          console.log(response);
          const dialogRef=this.dialog.open(AddedFavoritesDialogComponent);
        });
      }
      i += 1;
    })
  }
}
