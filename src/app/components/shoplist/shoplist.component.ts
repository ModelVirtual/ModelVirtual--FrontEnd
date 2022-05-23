import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Shop} from "../../interfaces/shop.interface";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-shoplist',
  templateUrl: './shoplist.component.html',
  styleUrls: ['./shoplist.component.css']
})
export class ShoplistComponent implements OnInit {

  dataSource: MatTableDataSource<Shop>;

  constructor(private shopService: ShopService) {
    this.dataSource = new MatTableDataSource<Shop>();
  }
  ngOnInit(): void {
    this.getAllShops();
  }
  getAllShops() : void {
    this.shopService.getAll().subscribe((response: any) => {
      this.dataSource.data=response;
    })
  }
}
