import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {STOCKINGService} from '../service/stocking.service';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  max = 100;
  min = 0;
  step = 1;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  type: Array<any>;
  detail: Array<any>;
  description: Array<any>;
  status: Array<any>;
  product: Array<any>;
  views: any = {
    percen : '',
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
    selectProductDate: '',
    selectProductPrice : '',
    selectStatus : '',
    selectType : '',
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
    this.STOCKService.getDetail().subscribe(data => {
      this.detail = data;
      console.log(this.detail);
    });
    this.STOCKService.getDescription().subscribe(data => {
      this.description = data;
      console.log(this.description);
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
    this.views.selectStatus = row.status.stateId;
    this.views.selectType = row.type.typeIds;
     console.log( this.views.selectProductName);
     console.log(this.views.selectProductPrice);
     console.log( this.views.selectProductQuantity);
     console.log( this.views.selectStatus);
     console.log(this.views.selectType);
     console.log(this.views.selectProductIds);
  }
 
}