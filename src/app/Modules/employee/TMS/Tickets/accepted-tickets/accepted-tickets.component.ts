import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accepted-tickets',
  templateUrl: './accepted-tickets.component.html',
  styleUrls: ['./accepted-tickets.component.css']
})
export class AcceptedTicketsComponent implements OnInit {

  loader: any;
  accpetList: any;
  roleID: any;
  closingComments: any;
  showPopup: any;
  todayDate: any;
  assignComments: any;
  assignedAgent: any;
  roleList: any;
  search: any;
  date: any;
  startDate: any;
  endDate: any;
  staffData: any;
  accpetListFilter: any;
  departmentData: any;
  cityData: any;
  count1: any = 10;
  p: any = 1;
  messageId: any;
  ClosingComments: any;
  ClosingAttachment: any;
  public attachments21: any = [];
  public attachmentsurl: any = [];
  customerID: any;

  constructor(private matDialog: MatDialog, public TMS: TMS, public router: Router, private modalService: NgbModal, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.GetTicketsData();
    this.RoleTypeData();
    this.todayDate = new Date();
    this.getStaff();
    this.getDepartment();
    this.getCity();
    this.loader = false;
    this.roleID = sessionStorage.getItem('roledid');

  }
  public getStaff() {
    this.TMS.GetStaff().subscribe(
      res => {
        debugger;
        this.staffData = res.filter(x => x.roleID == 2);

      }
    )
  }
  public GetTicketsData() {
    this.TMS.GetAcceptedTickets().subscribe(
      res => {
        debugger;
        this.accpetList = res;
        this.accpetListFilter = res;
        this.loader = false;
      })
  }
  public RoleTypeData() {
    this.TMS.GetRoleType().subscribe(
      res => {
        debugger;
        this.roleList = res;
        this.loader = false;
      })
  }
  async OpenassignPopUp(assignPopUp: any,data:any) {
    debugger
    this.assignComments=data.assignComments;
    this.assignedAgent=data.assignedAgent;
    this.customerID = data.customerID;
    this.modalService.open(assignPopUp, { centered: true, scrollable: true, size: 'md', backdrop: 'static' });
  }
  ticketid:any;
  gettciket(data:any){
    this.ticketid=data.id;
    this.customerID = data.customerID;
  }
  StaffID: any;
  public async AssignTickets() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
      var eb = {
        'ID':this.ticketid,
        'StatusID': 3,
        'AssignedAgent': this.assignedAgent,
        'AssignComments':this.assignComments
      };
 
      this.TMS.UpdateAssignTickets(eb)
        .subscribe({
          next: data => {
            debugger;
            this.loader = false;
            Swal.fire('Ticket Assigned Successfully')
            this.InsertNotificationAssisgn();
            //this.messageId = 10;
            //this.dialogRef.close(false);
            location.reload();
            this.router.navigate(['/Employee/AcceptedTickets']);
          },
          error: error => {
            console.error('Error:', error);
          },
          complete: () => {
            console.log('UpdateAssignTickets completed');
          }
        });
   
  }
  public InsertNotificationAssisgn() {
    this.showPopup = 0
    debugger
    var entity = {
      'StaffID': this.customerID,
      'Message': 'Your Ticket has been Assigned Successfully',
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


  attachments:any=[];
  onRemove21(event: any) {
    this.attachments21.splice(this.attachments.indexOf(event), 1);
    this.loader = false;
  }

  
  onSelect21(event: any) {
    debugger
    this.attachments21.length = 0;
    if (event.addedFiles == 0) {
      Swal.fire('Invalid Attachment Type');
      this.loader = false;
    }
    else {
      const uploadedFiles: File[] = event.addedFiles;
      for (const file of uploadedFiles) {
        try {
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          img.onload = async () => {
            if ((event.addedFiles[0].size) > 5242880) {
              Swal.fire('Please upload a file that is less than or equal to 5 MB.')
              this.attachments21.length = 0;
              this.loader = false;
            }
            else {
              this.attachments21.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
              this.loader = false;
            }
          }
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      };
    }
  }
  public submit() {
    this.showPopup = 0;
    debugger
    this.loader = true;
    if (this.attachments21.length == 0) {
      this.loader = false;
      this.Closeickets();
    }
    else {
      this.TMS.ProjectAttachments(this.attachments21)
        .subscribe({
          next: data => {
            debugger
            this.attachmentsurl.push(data);
            this.attachments.length = 0;
            this.Closeickets();
            this.loader = false;
          }
        })
    }
  }

  public async Closeickets() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      'ID': this.ticketid,
      'StatusID': 4,
      'ClosingComments': this.closingComments,
      'ClosedDate': new Date(),
      'ClosedAttachment': this.attachments21.length==0?null:this.attachmentsurl[0]
    };

    this.TMS.UpdateClosedTickets(eb)
      .subscribe({
        next: data => {
          debugger;
          this.loader = false;
          Swal.fire('Ticket Closed Successfully')
          this.InsertClosedNotification();
          //this.messageId = 10;
          //this.dialogRef.close(false);
          location.reload();
          this.router.navigate(['/Employee/AcceptedTickets']);
        },
        error: error => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('UpdateAssignTickets completed');
        }
      });

  }
  public InsertClosedNotification() {
    this.showPopup = 0
    debugger
    var entity = {
      'StaffID': this.customerID,
      'Message': 'Your Ticket has been Closed',
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

  async OpenclosePopUp(closePopUp: any,data:any) {
    this.closingComments=data.closingComments;
    this.modalService.open(closePopUp, { centered: true, scrollable: true, size: 'md', backdrop: 'static' });
  }
  public async CloseTickets() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      'StatusID': 4,
      'ClosingComments': this.closingComments,
      'ClosedDate': this.todayDate
    };

    this.TMS.UpdateClosedTickets(eb)
      .subscribe({
        next: data => {
          debugger;
          this.loader = false;
          Swal.fire('Ticket Closed Successfully')
          //this.messageId = 10;
          //this.dialogRef.close(false);
          location.reload();
          this.router.navigate(['/Employee/AcceptedTickets']);
        },
        error: error => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('UpdateClosedTickets completed');
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
      this.TMS.GetAcceptedTicketsByDate(this.startDate, this.endDate).subscribe(
        res => {
          debugger;
          this.accpetList = res;
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
    this.accpetList = this.accpetListFilter.filter((x: { department: any; }) => x.department == filteredData);
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
    this.accpetList = this.accpetListFilter.filter((x: { cityID: any; }) => x.cityID == filteredData);
  }
}
