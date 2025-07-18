import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-approvedtrips',
  templateUrl: './approvedtrips.component.html',
  styleUrls: ['./approvedtrips.component.css'],
})
export class ApprovedtripsComponent implements OnInit {
  messageId: any;
  showPopup: any;
  search: any;
  page: any = 1;
  RouteData: any[];
  RouteDataCopy: any[];
  TripDetailsData: any;
  TripDetailsDataCopy: any;
  startDate: any;
  endDate: any;
  loader: any;
  date: any;
  dailytripslist: any[];
  constructor(public TMS: TMS, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getassignedtrips();
    this.getRouteMaster();
  }
  tripdetails: any;
  public getassignedtrips() {
    this.TMS.GetDailyTrips().subscribe((res) => {
      debugger;
      this.tripdetails = res.filter((x) => x.status == 2);
    });
  }
  details: any;
  public gettrripdetails(data: any) {
    this.TMS.GetDailyTripsDetailsByID(data.id).subscribe((res) => {
      debugger;
      this.details = res;
    });
  }
  // public filteredType(event: any) {
  //   let filteredData = event.target.value;
  //   if (event.target.value == 0) {
  //     this.getRouteMaster();
  //   }
  //   this.RouteData = this.RouteDataCopy.filter((x: { id: any; }) => x.id== filteredData);
  // }
  public filteredType(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 0) {
      this.getEmployeeTrips();
    }
    this.TripDetailsData = this.TripDetailsDataCopy.filter(
      (x: { routeID: any }) => x.routeID == filteredData
    );
  }
  async getEmployeeTrips() {
    this.TMS.GetEmployeeTrips().subscribe((res) => {
      debugger;
      this.TripDetailsData = res;
      this.TripDetailsDataCopy = res;
    });
  }
  async getRouteMaster() {
    this.TMS.GetRouteMaster().subscribe((res) => {
      debugger;
      this.RouteData = res;
      this.RouteDataCopy = res;
    });
  }
  exportexcel(): void {
    let element = document.getElementById('ApprovedTripsList');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ApprovedTrips_Report.xlsx');
  }

  public approvetrip(data: any) {
    debugger;
    this.showPopup = 0;
    Swal.fire({
      title: 'Approve Trip',
      text: 'Are you sure you want to Approve it?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve',
    }).then((result) => {
      if (result.value) {
        var obj = {
          ID: data.id,
        };
        this.TMS.ApproveDailyTrip(obj).subscribe({
          next: (data) => {
            debugger;
            Swal.fire('Approved Successfully');
            this.ngOnInit();
          },
        });
      }
    });
  }
  public getEndDate(event: any) {
    debugger
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire("The end date should be greater than the start date")
      this.endDate = ""
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
    }
    else {
      this.TMS.GetDailyTripsByDate(this.startDate, this.endDate).subscribe(
        res => {
          debugger;
          this.tripdetails = res;
          this.loader = false;
        })
    }
  }
}
