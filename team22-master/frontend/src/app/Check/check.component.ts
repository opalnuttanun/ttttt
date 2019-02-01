import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {STOCKINGService} from '../service/stocking.service';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface Tile {
  cols: number;
  rows: number;
}
export interface StockElement {
  productID: String;
  productName: String;
  productPrice: number;
  productQuantity: number;
  type: {
    typeName: String;
  };
  status: {
    statusProduct: String;
  };
  productDate: Date;
}
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  tiles: Tile[] = [
    {cols: 2, rows: 1, },
  ];
  tile_right: Tile[] = [
    {cols: 3, rows: 1, },
  ];
  max = 100;
  min = 0;
  step = 1;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  type: Array<any>;
  status: Array<any>;
  product: Array<any>;
  views: any = {
    level : 0,
    comment: '',
    productID: '',
    productName: '',
    productQuantity: '',
    productPrice : '',
    statusSelect: '',
    typeSelect: '',
    prodID : '',
    selectProductID: '',
    selectProductName: '',
    selectProductQuantity: '',
    selectProductPrice : '',
    selectPID: ''
  };
  displayedColumns: string[] = ['PID', 'productID', 'productName', 'productPrice', 'productQuantity', 'types', 'statuses'];  myControl = new FormControl();
  constructor(private STOCKService: STOCKINGService,private snackBar: MatSnackBar, private httpClient: HttpClient, private _formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.STOCKService.getType().subscribe(data => {
      this.type = data;
      console.log(this.type);
    });
    this.STOCKService.getStatus().subscribe(data => {
      this.status = data;
      console.log(this.status);
    });
    this.STOCKService.getProduct().subscribe(data => {
      this.product = data;
      console.log(this.product);
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
   selectRow(row) {
    this.views.selectPID = row.prodId;
    this.views.selectProductID = row.productIds;
    this.views.selectProductName = row.productName;
    this.views.selectProductPrice = row.productPrice;
    this.views.selectProductQuantity = row.productQuantity;
     console.log( this.views.selectProductName);
     console.log(this.views.selectProductPrice);
     console.log( this.views.selectProductQuantity);
     console.log(this.views.selectProductID);
  }
  save() {
    this.httpClient.post('http://localhost:8080/checkproduct/' 
    +  this.views.prodID + '/' + this.views.level + '/' + this.views.comment,
      this.views, ) .subscribe(
          data => {
            this.snackBar.open('Check ', 'complete', {
            });
            console.log('INPUT Request is successful', data);
          },
          error => {
            this.snackBar.open('Check ', 'uncomplete', {
            });
            console.log('Error', error);
          }
        );
  }
}