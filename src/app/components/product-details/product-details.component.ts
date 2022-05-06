import { Component, OnInit } from '@angular/core';
import {Product} from "../../interfaces/product.interface";
import {ProductService} from "../../services/product.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number | undefined;
  ProductDetails$: Observable<Product> | undefined;


  constructor(
    private route:ActivatedRoute,
    private productService:ProductService
  ){

  }
  ngOnInit():void {
    this.route.paramMap.subscribe(
      params => {
        // @ts-ignore
        this.productId= +params.get('id');
      }
    );
    this.getProductsDetails();
  }

  getProductsDetails(){
    // @ts-ignore
    // @ts-ignore
    this.ProductDetails$=this.productService.getProductById(this.productId)
      .pipe(// @ts-ignore
        catchError(error =>{
          console.log('Error:',error);
          return EMPTY;
        })
      );
    console.log(this.ProductDetails$)
  }

}

