import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { AdddriverComponent } from '../adddriver/adddriver.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driverlist',
  templateUrl: './driverlist.component.html',
  styleUrls: ['./driverlist.component.css'],
})
export class DriverlistComponent implements OnInit {
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
  DriverData: any;

  constructor(public TMS: TMS, private matDialog: MatDialog) {}

  ngOnInit(): void {
    //this.getCustomer();
    this.getDriverData();
    //this.getCustomerCity();
    //this.getCustomerState();
    this.loader = false;
  }

  async getDriverData() {
    this.TMS.GetDriver().subscribe((res) => {
      debugger;
      this.DriverData = res;
      this.loader = false;
    });
  }

  // public getCustomer() {
  //   this.TMS.GetCustomer().subscribe(
  //     res => {
  //       debugger;
  //       this.customerList = res;
  //       this.customerListCopy = res;
  //       this.loader = false;
  //     })
  // }
  showDialog() {
    debugger;
    let ID = undefined;
    this.matDialog
      .open(AdddriverComponent, {
        data: ID,
        width: '100%',
        maxHeight: '80vh',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
  edit(ID: any) {
    debugger;
    this.matDialog
      .open(AdddriverComponent, {
        data: ID,
        width: '100%',
        maxHeight: '80vh',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  public Enable_Driver(id: any) {
    this.showPopup = 0;
    var eb = {
      ID: id,
      active: 1,
    };
    this.TMS.Enable_Driver(eb).subscribe((data) => {
      debugger;
      Swal.fire('Enabled Successfully.');
      this.loader = false;
      this.showPopup = 1;

      this.ngOnInit();
    });
  }

  public Disable_Driver(id: any) {
    this.showPopup = 0;
    var eb = {
      ID: id,
      active: 0,
    };
    this.TMS.Enable_Driver(eb).subscribe((data) => {
      debugger;
      Swal.fire('Disabled Successfully.');
      this.loader = false;
      this.showPopup = 1;

      this.ngOnInit();
    });
  }
  public openDeletePopUp(ID: any) {
    debugger;
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete record',
      text: 'Are you sure you want to delete it?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed',
    }).then((result) => {
      if (result.value) {
        this.TMS.DeleteDriver(ID).subscribe({
          next: (data) => {
            Swal.fire('Deleted Successfully');
            this.ngOnInit();
          },
        });
      }
    });
  }
  // public getCustomerState() {
  //   this.TMS.GetState().subscribe((res) => {
  //     debugger;
  //     this.stateData = res;
  //     this.loader = false;
  //   });
  // }
  // filteredState(event: any) {
  //   let filteredData = event.target.value;
  //   if (event.target.value == 'all') {
  //     this.getCustomer();
  //   }
  //   this.customerList = this.customerListCopy.filter(
  //     (x: { state: any }) => x.state == filteredData
  //   );
  // }
  // public getCustomerCity() {
  //   this.TMS.GetCity().subscribe((res) => {
  //     debugger;
  //     this.cityData = res;
  //     this.loader = false;
  //   });
  // }
  // public filteredCity(event: any) {
  //   let filteredData = event.target.value;
  //   if (event.target.value == 'all') {
  //     this.getCustomer();
  //   }
  //   this.customerList = this.customerListCopy.filter(
  //     (x: { city: any }) => x.city == filteredData
  //   );
  // }
}
