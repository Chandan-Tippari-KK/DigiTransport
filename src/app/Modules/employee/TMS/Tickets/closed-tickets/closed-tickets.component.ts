import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {
  loader: any;
  closedData: any;
  search: any;
  closedDataFilter: any;
  startDate: any;
  endDate: any;
  date: any;
  closedList: any;
  closedListFilter: any;
  departmentData: any;
  departmentDataCopy: any;
  cityData: any;
  cityDataCopy: any;
  closedDataCopy: any;
  page: any = 1;
messageId: any;
showPopup: any;

  constructor(public TMS: TMS,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getClosedTicket();
    this.getDepartment();
    this.getCity();
  }
  public getClosedTicket() {
    this.TMS.GetClosedTickets().subscribe(
      res => {
        debugger;
        this.closedData = res;
        this.closedDataCopy = res;
        this.loader = false;
      }
    )
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
      this.TMS.GetClosedTicketsByDate(this.startDate, this.endDate).subscribe(
        res => {
          debugger;
          this.closedData = res;
          this.loader = false;
        })
    }
  }
  public getDepartment() {
    this.TMS.GetDepartment().subscribe(
      res => {
        debugger;
        this.departmentData = res;
        this.loader = false;
      }
    )
  }
  public filteredDepartment(event: any) {
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.getClosedTicket();
    }
    this.closedData = this.closedDataCopy.filter((x: { department: any; }) => x.department == filteredData);
  }
  public getCity() {
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
      this.getClosedTicket();
    }
    this.closedData = this.closedDataCopy.filter((x: { cityID: any; }) => x.cityID == filteredData);
  }
}
