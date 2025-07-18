import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
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
  
  
  constructor( public TMS: TMS,
    private matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getCustomerCity();
    this.getCustomerState();
    this.loader=false
  
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
    this.matDialog.open(CustomerFormComponent, {
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
    this.matDialog.open(CustomerFormComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
  public openDeletePopUp(ID: any) {
    debugger
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value) {
        this.TMS.DeleteCustomer(ID)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
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
