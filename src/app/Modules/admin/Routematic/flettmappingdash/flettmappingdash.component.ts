import { Component, Inject, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { FlettmappingdashaddComponent } from '../flettmappingdashadd/flettmappingdashadd.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-flettmappingdash',
  templateUrl: './flettmappingdash.component.html',
  styleUrls: ['./flettmappingdash.component.css']
})
export class FlettmappingdashComponent implements OnInit {

  loader:any;
  customerList:any;
search: any;
  showPopup: any;
  staffList: any;
  firstName: any;
  lastName: any;
  phoneNo: any;
  emailID: any;
  country: any;
  state: any;
  city: any;
messageId: any;
stateData: any;
cityData: any;
  customerListCopy: any;
  page:any=1;
  roleid:any;
  
  constructor( public TMS: TMS,
    private matDialog: MatDialog,) { }
    rating:any;
  ngOnInit(): void {
    this.roleid=sessionStorage.getItem('roledid')
    this.getCustomer();
    this.getCustomerCity();
    this.getCustomerState();
    this.loader=false
  this.rating=3
  }

  public getCustomer() {
    this.TMS.GetCustomer().subscribe(
      res => {
        debugger;
        this.customerList = res;
        this.customerListCopy = res;
        this.loader = false;
      })
  }
  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(FlettmappingdashaddComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
  edit(ID: any) {
    debugger
    this.matDialog.open(FlettmappingdashaddComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
  public openDeletePopUp() {
    debugger
    this.showPopup = 0;
    Swal.fire({
      title: 'Approve Details',
      text: "Are you sure you want to Approve it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve'
    }).then((result) => {
      if (result.value) {
        Swal.fire('Approved Successfully');
        this.ngOnInit();
      }
    });
  }
  public getCustomerState() {
    this.TMS.GetState().subscribe(
      res => {
        debugger;
        this.stateData = res;
        this.loader = false;
      }
    )
  }
  filteredState(event: any){
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.getCustomer();
    }
    this.customerList = this.customerListCopy.filter((x: { state: any; }) => x.state == filteredData);
  }
  public getCustomerCity() {
    this.TMS.GetCity().subscribe(
      res => {
        debugger;
        this.cityData = res;
        this.loader = false;
      }
    )
  }
  public filteredCity(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.getCustomer();
    }
    this.customerList = this.customerListCopy.filter((x: { city: any; }) => x.city == filteredData);
  }

  
}


