import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-area-master',
  templateUrl: './add-area-master.component.html',
  styleUrls: ['./add-area-master.component.css']
})
export class AddAreaMasterComponent implements OnInit { 
  messageId: any;
  showPopup: any;
  search: any;
  page: any = 1;
  loader: boolean;
  areaList: any;
  short: any;
  description: any;
  latitude: any;
  longitude: any;
  constructor(public TMS: TMS,
    public router: Router,public dialogRef: MatDialogRef<AddAreaMasterComponent>, @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(){
    this.getData();
  }

  public getData() {
    debugger
    this.TMS.GetAreaMasterByID(this.ID)
      .subscribe({
        next: data => {
          debugger
          this.areaList = data;
          this.loader = false;
          this.short = this.areaList[0].short;
          this.description = this.areaList[0].description;
          this.latitude = this.areaList[0].latitude; 
          this.longitude = this.areaList[0].longitude; 
        }
      })
  }
  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }

 
  public InsertArea() {
    this.loader = true;
    this.showPopup = 0;
    debugger 
      if (this.short == "" || this.short == undefined ) {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 13;
      }
      else {
        var data = {
          'Short': this.short,
          'Description': this.description,
          'Latitude': this.latitude,
          'Longitude': this.longitude, 
        }
        this.TMS.InsertAreaMaster(data)
          .subscribe({
            next: data => {
              debugger
              this.router.navigate(['/admin/AreaMasterDashboard']);
              this.dialogRef.close(false);
              this.loader = false;
              Swal.fire('Registration Completed Successfully');
              this.showPopup = 1;
              this.messageId = 8;
            }
          })
      }
    }  
 
    public UpdateArea() {
      debugger
      this.showPopup = 0;
      this.loader = true;
      var eb = {
        'ID': this.ID,
        'Short': this.short,
        'Description': this.description,
        'Latitude': this.latitude,
        'Longitude': this.longitude, 
        
      }
      this.TMS.UpdateAreaMaster(eb)
        .subscribe({
          next: data => {
            debugger
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 10; 
            this.dialogRef.close(false);
            this.router.navigate(['/admin/AreaMasterDashboard']);
            this.loader = false;
          }
        })
    }
  }

 

