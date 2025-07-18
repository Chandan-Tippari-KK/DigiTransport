import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { EmployeeroasteraddComponent } from '../employeeroasteradd/employeeroasteradd.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employeeroasterdash',
  templateUrl: './employeeroasterdash.component.html',
  styleUrls: ['./employeeroasterdash.component.css'],
})
export class EmployeeroasterdashComponent implements OnInit {
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
  EmployeeRoasterData: any;
  RouteData: any;
  EmployeeRoasterDataCopy: any[];

  constructor(public TMS: TMS, private matDialog: MatDialog) {}
  rating: any;
  ngOnInit(): void {
    this.getCustomer();
    this.getCustomerCity();
    this.getCustomerState();
    this.getEmployeeRoaster();
    this.getRouteMaster();
    this.loader = false;
    this.rating = 3;
  }

  async getEmployeeRoaster() {
    this.TMS.GetEmployeeRoaster().subscribe((res) => {
      debugger;
      this.EmployeeRoasterData = res;
      this.EmployeeRoasterDataCopy = res;
    });
  }

  async getRouteMaster() {
    this.TMS.GetRouteMaster().subscribe((res) => {
      debugger;
      this.RouteData = res;
    });
  }

  public filteredType(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 0) {
      this.getEmployeeRoaster();
    }
    this.EmployeeRoasterData = this.EmployeeRoasterDataCopy.filter(
      (x: { routeID: any }) => x.routeID == filteredData
    );
  }

  exportexcel(): void {
    let element = document.getElementById('EmployeeRoasterList');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'EmployeeRoaster_Report.xlsx');
  }

  public Enable_Client(id: any) {
    this.showPopup = 0;
    var eb = {
      ID: id,
      active: 1,
    };
    this.TMS.Enable_Client(eb).subscribe((data) => {
      debugger;
      /*  Swal.fire('Enabled Successfully.'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 77;
      location.reload();
    });
  }

  public getCustomer() {
    this.TMS.GetCustomer().subscribe((res) => {
      debugger;
      this.customerList = res;
      this.customerListCopy = res;
      this.loader = false;
    });
  }
  showDialog() {
    debugger;
    let ID = undefined;
    this.matDialog
      .open(EmployeeroasteraddComponent, {
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
      .open(EmployeeroasteraddComponent, {
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
        this.TMS.DeleteEmployeeRoaster(ID).subscribe({
          next: (data) => {
            Swal.fire('Deleted Successfully');
            this.ngOnInit();
          },
        });
      }
    });
  }
  public getCustomerState() {
    this.TMS.GetState().subscribe((res) => {
      debugger;
      this.stateData = res;
      this.loader = false;
    });
  }
  filteredState(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.getCustomer();
    }
    this.customerList = this.customerListCopy.filter(
      (x: { state: any }) => x.state == filteredData
    );
  }
  public getCustomerCity() {
    this.TMS.GetCity().subscribe((res) => {
      debugger;
      this.cityData = res;
      this.loader = false;
    });
  }
  public filteredCity(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.getCustomer();
    }
    this.customerList = this.customerListCopy.filter(
      (x: { city: any }) => x.city == filteredData
    );
  }
}
