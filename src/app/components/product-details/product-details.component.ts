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
  productId;
  ProductDetails$: Observable<Product> | undefined;


  constructor(
    private route:ActivatedRoute,
    private productService:ProductService
    ){
    this.productId=this.route.snapshot.paramMap.get('id');
  }
  ngOnInit():void {
    this.route.paramMap.subscribe(
      params => {
        // @ts-ignore
        this.productId= +params.get('id');
        this.getProductsDetails();
      }
    );


    }

    //this.productid=this.activerouter.snapshot.paramMap.get('id');
    //this.productid = this.activerouter.snapshot.params(['id']);
    //console.log(id);

    /*this.activerouter.params.subscribe(
      (params: Params) => {
        this.productid = +params["id"];
        console.log(this.productid);
      }
    );*/


      //this.productService.getProductById(this.productid).subscribe(resp=>this.product=resp);

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
    }
  }




