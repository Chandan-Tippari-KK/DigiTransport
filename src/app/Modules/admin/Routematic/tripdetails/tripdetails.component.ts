import { Component, Inject, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { AddtripdeatilsComponent } from '../addtripdeatils/addtripdeatils.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FlettmappingdashaddComponent } from '../flettmappingdashadd/flettmappingdashadd.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css'],
})
export class TripdetailsComponent implements OnInit {
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
  roleid: any;
  TripDetailsData: any;
  RouteData: any;
  RouteDataCopy: any[];
  routeList: any[];
  ClientData: any;
  startDate: any;
  endDate: any;
  date: any;

  constructor(
    public TMS: TMS,
    private matDialog: MatDialog,
    private datePipe: DatePipe
  ) {}
  rating: any;
  TripDetailsDataCopy: any;
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roledid');
    this.getCustomer();
    this.getCustomerCity();
    this.getCustomerState();
    this.getEmployeeTrips();
    this.getRouteMaster();
    this.getClientMaster();
    this.loader = false;
    this.rating = 3;
  }

  public getEndDate(event: any) {
    debugger;
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire('The end date should be greater than the start date');
      this.endDate = '';
    } else if (this.startDate == undefined) {
      Swal.fire('Please select the start date first');
      this.endDate = '';
    } else {
      this.TMS.GetEmployeeTripsByDate(this.startDate, this.endDate).subscribe(
        (res) => {
          debugger;
          this.TripDetailsData = res;
          this.loader = false;
        }
      );
    }
  }

  async getEmployeeTrips() {
    this.TMS.GetEmployeeTrips().subscribe((res) => {
      debugger;
      if (this.roleid == 3) {
        this.TripDetailsData = res.filter(x=>x.empid==sessionStorage.getItem('empid'));
        this.TripDetailsDataCopy = res;
      } else {
        this.TripDetailsData = res;
        this.TripDetailsDataCopy = res;
      }
    });
  }

  async getRouteMaster() {
    this.TMS.GetRouteMaster().subscribe((res) => {
      debugger;
      this.RouteData = res;
    });
  }

  async getClientMaster() {
    this.TMS.GetCompany().subscribe((res) => {
      debugger;
      this.ClientData = res;
    });
  }

  public filteredType(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 0) {
      this.getEmployeeTrips();
    }
    this.TripDetailsData = this.TripDetailsDataCopy.filter(
      (x: { routeID: any }) => x.routeID == filteredData
    );
  }

  public clientfilteredType(event: any) {
    let clientfilteredData = event.target.value;
    if (event.target.value == 0) {
      this.getEmployeeTrips();
    }
    this.TripDetailsData = this.TripDetailsDataCopy.filter(
      (x: { clientid: any }) => x.clientid == clientfilteredData
    );
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
      .open(AddtripdeatilsComponent, {
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
  showDialog1() {
    debugger;
    let ID = this.ID;
    this.matDialog
      .open(FlettmappingdashaddComponent, {
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
      .open(AddtripdeatilsComponent, {
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

  public openDeletePopUp(id: any) {
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
      if (result.value == true) {
        this.TMS.DeleteEmployeeTrips(id).subscribe({
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
  temp: any = [];
  IntID: any;
  ID: any = [];
  selecallbtn: boolean = false;
  public getCheckbocdetails(evn: any) {
    debugger
    let temp: any = evn;
    this.temp = Object.entries(temp);

    if (this.temp.every((val: { checked: boolean }) => val.checked == true)) {
      this.IntID = false;
      this.ID = [];
      this.temp.forEach((val: { checked: boolean }) => {
        val.checked = false;
      });
      this.IntID = false;
    } else {
      this.selecallbtn = true;
      //  this.ID = [];

      this.temp.forEach((val: { checked: boolean }) => {
        val.checked = true;
      });
      this.IntID = true;
      var obj: any = {};
      obj['id'] = evn.id;
      obj['empid'] = evn.empid;
      obj['droplocationid'] = evn.droplocationid;
      obj['date'] = evn.date;
      obj['tripType'] = evn.tripType;
      obj['tripType'] = evn.tripType=='Log In'?1:2;
      obj['routeID'] = evn.routeID;
      obj['ShiftTime'] = evn.shiftTime;
      obj['category'] = evn.category;
      this.ID.push(obj);
      console.log(this.ID);
    }
  }
}
