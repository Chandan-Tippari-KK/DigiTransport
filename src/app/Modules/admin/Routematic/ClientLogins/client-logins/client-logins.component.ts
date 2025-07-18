import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { MatDialog } from '@angular/material/dialog';
import { AddClientLoginComponent } from '../add-client-login/add-client-login.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-logins',
  templateUrl: './client-logins.component.html',
  styleUrls: ['./client-logins.component.css']
})
export class ClientLoginsComponent implements OnInit {
messageId: number;
showPopup: any;
search: any;
page: any = 1;
  loader: any;
  clientloginlist: any[];

constructor(public TMS: TMS, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getclientLogin();
  }
  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(AddClientLoginComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
  edit(ID: any) {
    debugger
    this.matDialog.open(AddClientLoginComponent, {
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
        this.TMS.DeleteClientLogin(ID)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  public getclientLogin() {
    this.TMS.GetClientLogin().subscribe(
      res => {
        debugger;
        this.clientloginlist = res; 
        this.loader = false;
      })
  }
}
