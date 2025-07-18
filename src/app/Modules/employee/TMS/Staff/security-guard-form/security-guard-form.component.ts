import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-security-guard-form',
  templateUrl: './security-guard-form.component.html',
  styleUrls: ['./security-guard-form.component.css']
})
export class SecurityGuardFormComponent implements OnInit {
  messageId: number;
  showPopup: any;
  loader: any;
  FirstName: any; 
  LastName: any;
  DateOfJoining: any;
  AadharNo: any;
  Email: any;
  Address: any;
  MobileNo: any;
  staffGuardData: any[];

  constructor(public TMS: TMS,public dialogRef: MatDialogRef<SecurityGuardFormComponent>,@Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    this.getData();
  }

  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }
  public getData() {
    debugger;
    this.TMS.GetStaffGuardByID(this.ID).subscribe({
      next: (data) => {
        debugger;
        this.staffGuardData = data;
        this.loader = false; 
        this.FirstName = this.staffGuardData[0].firstName;
        this.LastName = this.staffGuardData[0].lastName;
        this.DateOfJoining = this.staffGuardData[0].dateOfJoining;
        this.AadharNo = this.staffGuardData[0].aadharNo;
        this.Email = this.staffGuardData[0].email;
        this.Address = this.staffGuardData[0].address;
        this.MobileNo = this.staffGuardData[0].mobileNo;
      },
    });
  }
  public insertStaffGuard() {
    this.loader = true;
    this.showPopup = 0;
    debugger; 
    if (
      this.FirstName == '' ||
      this.FirstName == undefined ||
      this.Address == '' ||
      this.Address == undefined ||
      this.LastName == '' ||
      this.LastName == undefined ||
      this.Email == '' ||
      this.Email == undefined ||
      this.DateOfJoining == '' ||
      this.DateOfJoining == undefined ||
      this.AadharNo == '' ||
      this.AadharNo == undefined ||
      this.MobileNo == '' ||
      this.MobileNo == undefined
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var data = {
        FirstName: this.FirstName, 
        LastName: this.LastName,
        DateOfJoining: this.DateOfJoining,
        AadharNo: this.AadharNo,
        MobileNo: this.MobileNo,
        Address: this.Address, 
        Email: this.Email,
       
      };
      this.TMS.InsertStaffGuard(data).subscribe({
        next: (data) => {
          debugger;
          this.dialogRef.close(false);
          this.loader = false;
          Swal.fire('Registration Completed Successfully');
          this.showPopup = 1;
          this.messageId = 8;
        },
      });
    } 
  }
  public updateStaffGuard() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      FirstName: this.FirstName, 
        LastName: this.LastName,
        DateOfJoining: this.DateOfJoining,
        AadharNo: this.AadharNo,
        MobileNo: this.MobileNo,
        Address: this.Address, 
        Email: this.Email, 
    };
    this.TMS.UpdateStaffGuard(eb).subscribe({
      next: (data) => {
        debugger;
        this.loader = false;
        Swal.fire('Customer Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10;
        this.dialogRef.close(false);
        //this.router.navigate(['/Employee/Customer']);
        this.loader = false;
      },
    });
  }
}
