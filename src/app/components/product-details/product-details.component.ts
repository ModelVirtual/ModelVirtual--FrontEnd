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

  sizeArrayFromStr(sizes: string): Array<string> {
    let sizeArray:Array<string> = new Array<string>();
    let size: string = "";
    for(let i=0;i<sizes.length; ++i) {
      if (sizes.charAt(i)==',' || i==sizes.length-1)
      {
        sizeArray.push(size);
        size = "";
      }
      else
        size+=sizes.charAt(i);
    }
    return sizeArray;
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
    this.ProductDetails$=this.productService.getProductById(this.productId);
    this.ProductDetails$.subscribe(clientes =>  clientes);
  }

}
