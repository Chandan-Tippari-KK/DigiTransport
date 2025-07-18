import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import { NewTicketsComponent } from '../new-tickets/new-tickets.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-tickets-form',
  templateUrl: './new-tickets-form.component.html',
  styleUrls: ['./new-tickets-form.component.css']
})
export class NewTicketsFormComponent implements OnInit {
  loader: any;
  files: any;
  showPopup: number = 0;
  messageId: number = 0;
  raisedDate: any;
subject: any;
department: any;
priority: any;
issue: any;
area: any;
attachment:any;
public attachments21: any = [];
public attachmentsurl: any = [];
  departmentList: any;
  public attachments: any = [];
  cityList: any;
address: any;
cityID: any;
  customerID: any;
  constructor(public TMS: TMS, public dialogRef: MatDialogRef<NewTicketsComponent>,public router: Router,
    @Inject(MAT_DIALOG_DATA) public ID: any
    ) { }

  ngOnInit(): void {
    this.GetDepartmentData();
    this.getCity();
    this.customerID=sessionStorage.getItem('staffid');
  }
  public cancel() {
    location.href = "#/Employee/StaffDash";
    this.loader = false;
    this.dialogRef.close(false);
  }
  onRemove() {
    this.files = [];
     }

     public submit() {
      this.showPopup = 0;
      debugger
      this.loader = true;
      if (this.attachments21.length == 0) {
        this.loader = false;
        this.InsertTicket();
      }
      else {
        this.TMS.ProjectAttachments(this.attachments21)
          .subscribe({
            next: data => {
              debugger
              this.attachmentsurl.push(data);
              this.attachments.length = 0;
              this.InsertTicket();
              this.loader = false;
            }
          })
      }
    }
    public InsertTicket() {
      this.loader = true;
      this.showPopup = 0;
      debugger
      if (this.raisedDate == undefined ||this.raisedDate == "" ||this.subject == undefined || this.subject == "" || this.cityID == undefined || this.cityID == "" || this.department == undefined || this.department == "" || this.address == undefined ||this.address == "" ||this.area == "" || this.area == undefined || this.issue == undefined ||this.issue == ""  ) {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 13;
      }
      else {
        var eb = {
          'RaisedDate': this.raisedDate,
          'Subject': this.subject,
          'Department': this.department,
          'Priority': 'nothing',
          'Area': this.area,
          'Issue': this.issue,
          'Attachment':this.attachments21.length==0?null:this.attachmentsurl[0],
          'RoleID':2,
          'Address':this.address,
          'CityID':this.cityID,
          'CustomerID':this.customerID,
          'StatusID':5
        }
        this.TMS.InsertTickets(eb)
          .subscribe({
            next: data => {
              debugger
              this.router.navigate(['/Employee/NewTickets']);
              this.dialogRef.close(false);
              this.loader = false;
              Swal.fire('Tickets Added Successfully');
              this.showPopup = 1;
              this.messageId = 8;
            }
          })
      }
    }
    public GetDepartmentData() {
      this.TMS.GetDepartment().subscribe(
        res => {
          debugger;
          this.departmentList = res;
          this.loader = false;
        })
    }
    onSelect21(event: any) {
      debugger
      this.showPopup = 0;
      this.attachments21.length = 0;
      if (event.addedFiles[0].size / 1048576 > 2) {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 14;
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
              }
              else {
                this.attachments21.push(...event.addedFiles);
                Swal.fire('Attachment uploaded');
              }
            }
          } catch (e) {
            throw 'This is being thrown after setting img.src';
          }
        };
      }
    }
    onRemove21(event: any) {
      this.attachments21.splice(this.attachments.indexOf(event), 1);
    }
  
    public getCity() {
      this.TMS.GetCity().subscribe(
        res => {
          debugger;
          this.cityList = res;
          this.loader = false;
        })
    }
}
