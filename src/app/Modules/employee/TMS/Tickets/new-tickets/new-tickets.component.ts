import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewTicketsFormComponent } from '../new-tickets-form/new-tickets-form.component';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-tickets',
  templateUrl: './new-tickets.component.html',
  styleUrls: ['./new-tickets.component.css']
})
export class NewTicketsComponent implements OnInit {
  loader: any;
  newTicketList: any;
  roleID: any;
  staffList: any;
  search: any;
  showPopup: any;
  todayDate: any;
  rejectComments: any;
  date: any;
  startDate: any;
  endDate: any;
  departmentData: any;
  cityData: any;
  newTicketListCopy: any;
id: any;
data: any;
page: any=1;
  CustomerID: any;
  RoledID: any;
messageId: any;
  customerID: any;
  customerRejID: any;

  constructor(private matDialog: MatDialog, private datePipe: DatePipe, public TMS: TMS, public router: Router, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.CustomerID=sessionStorage.getItem('staffid');
    this.RoledID=sessionStorage.getItem('roledid');
    this.GetTicketsData();
    this.GetStaffData();
    this.getDepartment();
    this.getCity();
    this.todayDate = new Date();
    this.loader = false;

  }
  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(NewTicketsFormComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  public GetTicketsData() {
    debugger
    if(this.RoledID==1){
      this.TMS.GetTicketsForCustomer().subscribe(
        res => {
          debugger;
          this.newTicketList = res.filter(x => x.customerID == this.CustomerID);
          this.newTicketListCopy = res.filter(x => x.customerID == this.CustomerID);  
          this.loader = false;
        })  
    }else{
      this.TMS.GetTickets().subscribe(
        res => {
          debugger;
          this.newTicketList = res.filter(x => x.statusID == 5);
          this.newTicketListCopy = res.filter(x => x.statusID == 5);
          this.loader = false;
        })
    }
   
  }
  public GetStaffData() {
    this.TMS.GetStaff().subscribe(
      res => {
        debugger;
        this.staffList = res;
        this.loader = false;
      })
  }


  public ApproveTickets(id: any) {
    debugger
    Swal.fire({
      title: 'Accept Ticket',
      text: "Are you sure? You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accept it!'
    }).then((result) => {
      if (result.value == true) {
        this.showPopup = 0;
        this.loader = true;
        this.customerID = id.customerID;
        var eb = {
          'ID': id.id,
          'StatusID': 1,
          'AcceptedDate': this.todayDate
        };

        this.TMS.UpdateApproveTickets(eb)
          .subscribe({
            next: data => {
              debugger;
              this.loader = false;
              Swal.fire('Ticket Accepted Successfully');
              //this.messageId = 10;
              // this.dialogRef.close(false);
              // this.ngOnInit();
              // this.GetTicketsData();
              this.InsertApproveNotificationTMS();
              location.reload();
              this.router.navigate(['/Employee/NewTickets']);
            },
            error: error => {
              console.error('Error:', error);
            },
            complete: () => {
              console.log('UpdateApproveTickets completed');
            }
          }
          );
      }
    })
  }
  async OpenrejectPopUp(rejectPopUp: any, data: any) {
    debugger
    this.id = data.id;
    this.customerRejID = data.customerID;
    this.rejectComments = data.rejectComments;
    this.modalService.open(rejectPopUp, { centered: true, scrollable: true, size: 'md', backdrop: 'static' });
  }
  public async RejectTickets(id: any) {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      'ID': this.id,
      'StatusID': 2,
      'RejectComments': this.rejectComments,
      'RejectedDate': this.todayDate
    };

    this.TMS.UpdateRejectTickets(eb)
      .subscribe({
        next: data => {
          debugger;
          this.loader = false;
          Swal.fire('Ticket Rejected Successfully')
          //this.messageId = 10;
          //this.dialogRef.close(false);
          this.InsertNotificationTMS();
          location.reload();
          // this.GetTicketsData();
          this.router.navigate(['/Employee/NewTickets']);
        },
        error: error => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('UpdateRejectTickets completed');
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
      this.TMS.GetTicketsbydate(this.startDate, this.endDate).subscribe(
        res => {
          debugger;
          this.newTicketList = res;
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
    this.newTicketList = this.newTicketListCopy.filter((x: { department: any; }) => x.department == filteredData);
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
    this.newTicketList = this.newTicketListCopy.filter((x: { cityID: any; }) => x.cityID == filteredData);
  }
  public InsertApproveNotificationTMS() {
    this.showPopup = 0
    debugger
    var entity = {
      'StaffID': this.customerID,
      'Message': 'Your Ticket has been Approved Successfully',
      'ReadBit': 0
    }
    this.TMS.InsertNotificationsTMS(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
          }
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
          // location.reload();
          this.loader = false;
        }
      })
  }
  public InsertNotificationTMS() {
    this.showPopup = 0
    debugger
    var entity = {
      'StaffID': this.customerRejID,
      'Message': 'Your Ticket has been Rejected',
      'ReadBit': 0
    }
    this.TMS.InsertNotificationsTMS(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
          }
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
          // location.reload();
          this.loader = false;
        }
      })
  }

}
