import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../interfaces/product.interface";
import {ProductService} from "../../services/product.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import {MatSort} from "@angular/material/sort";

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

  constructor(private productService: ProductService) {
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
  }




}
