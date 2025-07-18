import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TMS } from 'src/app/Services/TMS.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAreaMasterComponent } from '../add-area-master/add-area-master.component';

@Component({
  selector: 'app-area-master-dashboard',
  templateUrl: './area-master-dashboard.component.html',
  styleUrls: ['./area-master-dashboard.component.css']
})
export class AreaMasterDashboardComponent implements OnInit {
  messageId: any;
  showPopup: any;
  search: any;
  page: any = 1;
  loader: any;
  areaMasterList:any[];
  areaMasterListCopy: any[];

  constructor(public TMS: TMS, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getArea();
  }
  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(AddAreaMasterComponent, {
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
        this.TMS.DeleteAreaMaster(ID)
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
    this.matDialog.open(AddAreaMasterComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }


  public getArea() {
    this.TMS.GetAreaMaster().subscribe(
      res => {
        debugger;
        this.areaMasterList = res;
        this.areaMasterListCopy = res;
        this.loader = false;
      })
  }
}
