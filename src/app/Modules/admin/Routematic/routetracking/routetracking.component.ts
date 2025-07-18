import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-routetracking',
  templateUrl: './routetracking.component.html',
  styleUrls: ['./routetracking.component.css'],
})
export class RoutetrackingComponent implements OnInit {
  messageId: any;
  showPopup: any;
  search: any;
  page: any = 1;
  route: any;
  date:any;
  routetrackingdetails: any;
  constructor(public TMS: TMS,public datePipe:DatePipe) {}

  ngOnInit(): void {
    this.getroutetrackingdetails();
    this.getRouteMaster();
  }

  public getroutetrackingdetails() {
    this.TMS.GetDailyTripsDetails().subscribe((res) => {
      debugger;
      this.routetrackingdetails = res;
    });
  }
  RouteData:any;
   getRouteMaster() {
    this.TMS.GetRouteMaster().subscribe((res) => {
      debugger;
      this.RouteData = res;
    });
  }
  public getroutetrackingdetailsbyid(data: any) {
    this.TMS.GetDailyTripsByID(data.id).subscribe((res) => {
      debugger;
      this.route = res;
    });
  }

  exportexcel(): void {
    let element = document.getElementById('RouteTrackingList');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'RouteTracking_Report.xlsx');
  }
  startDate:any;
  endDate:any;
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
      this.getroutetrackingdetails()
    }
  }

  
  public filteredType(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 0) {
      this.getroutetrackingdetails();
    }else{
      this.TMS.GetDailyTripsDetails().subscribe((res) => {
        debugger;
        this.routetrackingdetails = res;
      });
    }
   
  }
}
