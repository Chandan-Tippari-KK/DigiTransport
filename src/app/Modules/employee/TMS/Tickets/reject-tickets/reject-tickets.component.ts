import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reject-tickets',
  templateUrl: './reject-tickets.component.html',
  styleUrls: ['./reject-tickets.component.css']
})
export class RejectTicketsComponent implements OnInit {

  loader: any;
  rejectList: any;
  search: any;
  startDate: any;
  endDate: any;
  rejectListFilter: any;
  reject: any;
  rejectFilter: any;
  date: any;
  rejectListCopy: any;
  page: any=1;
  departmentData: any;
  cityData: any;
messageId: any;
showPopup: any;

  constructor(private matDialog: MatDialog, public TMS: TMS,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.GetTicketsData();
    this.getDepartment();
    this.getCity();
    this.loader = false;

  }
  public GetTicketsData() {
    this.TMS.GetRejectedTickets().subscribe(
      res => {
        debugger;
        this.rejectList = res;
        this.rejectListCopy=res;
        this.loader = false;
      })
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
      this.TMS.GetRejectedTicketsByDate(this.startDate, this.endDate).subscribe(
        res => {
          debugger;
          this.rejectList = res;
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
      this.GetTicketsData();
    }
    this.rejectList = this.rejectListCopy.filter((x: { department: any; }) => x.department== filteredData);

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
      this.GetTicketsData();
    }
    this.rejectList = this.rejectListCopy.filter((x: { cityID: any; }) => x.cityID == filteredData);
  }
}
