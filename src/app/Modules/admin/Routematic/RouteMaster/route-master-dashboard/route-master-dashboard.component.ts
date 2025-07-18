import { Component, OnInit } from '@angular/core';
import { AddRouteMasterComponent } from '../add-route-master/add-route-master.component';
import { TMS } from 'src/app/Services/TMS.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-route-master-dashboard',
  templateUrl: './route-master-dashboard.component.html',
  styleUrls: ['./route-master-dashboard.component.css']
})
export class RouteMasterDashboardComponent implements OnInit {
  messageId: any;
  showPopup: any;
  search: any;
  page: any = 1;
  routeList: any[];
  loader: any;
  routeListCopy: any[];

  constructor(public TMS: TMS, private matDialog: MatDialog) { }

  ngOnInit(){
    this.getRouteMaster();
  }

  public getRouteMaster() {
    this.TMS.GetRouteMaster().subscribe(
      res => {
        debugger;
        this.routeList = res;
        this.routeListCopy = res;
        this.loader = false;
      })
  }
  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(AddRouteMasterComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  public openDeletePopUp(ID: any) {
    debugger
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value) {
        this.TMS.DeleteRouteMaster(ID)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  edit(ID: any) {
    debugger
    this.matDialog.open(AddRouteMasterComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
}
