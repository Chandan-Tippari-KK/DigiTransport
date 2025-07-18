import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-client-login',
  templateUrl: './add-client-login.component.html',
  styleUrls: ['./add-client-login.component.css']
})
export class AddClientLoginComponent implements OnInit {
  messageId: number;
  showPopup: any;
  clientID: any;
  userName: any;
  password: any;
  loader: any;
  companyData: any[];
  cleintLoginlist: any[]; 

  constructor(public TMS: TMS,
    public router: Router,public dialogRef: MatDialogRef<AddClientLoginComponent>, @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(){
    this.getData();
    this.getCompany(); 
  }
  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }
  public InsertClientLogin() {
    this.loader = true;
    this.showPopup = 0;
    debugger 
      if (this.clientID == "" || this.clientID == undefined ) {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 13;
      }
      else {
        var data = {
          'ClientID': this.clientID,
          'UserName': this.userName,
          'Password': this.password 
          
        }
        this.TMS.InsertCleintLogin(data)
          .subscribe({
            next: data => {
              debugger
              this.router.navigate(['/admin/ClientLogin']);
              this.dialogRef.close(false);
              this.loader = false;
              Swal.fire('Registration Completed Successfully');
              this.showPopup = 1;
              this.messageId = 8;
            }
          })
      }
    } 
    public UpdateClientLogin() {
      debugger
      this.showPopup = 0;
      this.loader = true;
      var eb = {
        'ID': this.ID,
        'ClientID': this.clientID,
        'UserName': this.userName,
        'Password': this.password 
        
      }
      this.TMS.UpdateClientLogin(eb)
        .subscribe({
          next: data => {
            debugger
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 10; 
            this.dialogRef.close(false);
            this.router.navigate(['/admin/ClientLogin']);
            this.loader = false;
          }
        })
    }
    public getCompany() {
      this.TMS.GetCompany().subscribe(
        res => {
          debugger;
          this.companyData = res; 
          this.loader = false;
        })
    }
     
    public getData() {
      debugger
      this.TMS.GetClientLoginByID(this.ID)
        .subscribe({
          next: data => {
            debugger
            this.cleintLoginlist = data;
            this.loader = false;
            this.clientID = this.cleintLoginlist[0].clientID;
            this.userName = this.cleintLoginlist[0].userName;
            this.password = this.cleintLoginlist[0].password;
             
          }
        })
    }
}
