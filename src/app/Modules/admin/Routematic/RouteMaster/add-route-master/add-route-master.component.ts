import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-route-master',
  templateUrl: './add-route-master.component.html',
  styleUrls: ['./add-route-master.component.css']
})
export class AddRouteMasterComponent implements OnInit {
  showPopup: any;
  messageId: number;
  loader: any;
  routeList: any[];
  routeCode: any;
  locations: any;
  startLocation: any;
  endLocation: any;
  dropdownSettings: any;
  areaList: any[];
  areaListCopy: any;

  constructor(public TMS: TMS,
    public router: Router, public dialogRef: MatDialogRef<AddRouteMasterComponent>, @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit() {
    this.getData();
    this.getAreaMaster();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
  }

  public getData() {
    debugger
    this.TMS.GetRouteMasterByID(this.ID)
      .subscribe({
        next: data => {
          debugger
          this.routeList = data;
          this.loader = false;
          this.routeCode = this.routeList[0].routeCode;
          this.locations = this.routeList[0].locations;
          this.startLocation = this.routeList[0].startLocation;
          this.endLocation = this.routeList[0].endLocation;
        }
      })
  }
  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }

  public InsertRoute() {
    this.loader = true;
    this.showPopup = 0;
    debugger
    if (this.routeCode == "" || this.routeCode == undefined) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var data = {
        'RouteCode': this.routeCode,
        'Locations': this.locations,
        'StartLocation': this.startLocation,
        'EndLocation': this.endLocation,

      }
      this.TMS.InsertRouteMaster(data)
        .subscribe({
          next: data => {
            debugger
            this.router.navigate(['/admin/RouteMasterDashboard']);
            this.dialogRef.close(false);
            this.loader = false;
            Swal.fire('Registration Completed Successfully');
            this.showPopup = 1;
            this.messageId = 8;
          }
        })
    }
  }

  public UpdateRoute() {
    debugger
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      'ID': this.ID,
      'RouteCode': this.routeCode,
      'Locations': this.locations,
      'StartLocation': this.startLocation,
      'EndLocation': this.endLocation,

    }
    this.TMS.UpdateRouteMaster(eb)
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          this.dialogRef.close(false);
          this.router.navigate(['/admin/RouteMasterDashboard']);
          this.loader = false;
        }
      })
  }

  public getAreaMaster() {
    this.TMS.GetAreaMaster().subscribe(
      res => { 
        debugger;
        this.areaList = res;
        this.areaListCopy = this.areaList;
        this.loader = false;
      })
  }
}
