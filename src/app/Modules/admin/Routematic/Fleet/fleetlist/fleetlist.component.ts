import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { AddfleetComponent } from '../addfleet/addfleet.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fleetlist',
  templateUrl: './fleetlist.component.html',
  styleUrls: ['./fleetlist.component.css'],

})
export class FleetlistComponent implements OnInit {

  loader: any;
  customerList: any;
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
  page: any = 1;
  fleetList: any[];
  fleetListCopy: any[];


  constructor(public TMS: TMS,
    private matDialog: MatDialog,) { }
  rating: any;
  ngOnInit(): void {
    this.getFleet();
    this.loader = false
 
  }


  public getFleet() {
    this.TMS.GetFleet().subscribe(
      res => {
        debugger;
        this.fleetList = res;
        this.fleetListCopy = res;
        this.loader = false;
      })
  }
  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(AddfleetComponent, {
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
    this.matDialog.open(AddfleetComponent, {
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
        this.TMS.DeleteFleet(ID)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  filteredState(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.getFleet();
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
  public filteredType(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 0) {
      this.getFleet();
    }
    this.fleetList = this.fleetListCopy.filter((x: { vehicleType: any; }) => x.vehicleType == filteredData);
  }
}
