import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { ClientofficeaddComponent } from '../clientofficeadd/clientofficeadd.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientofficedash',
  templateUrl: './clientofficedash.component.html',
  styleUrls: ['./clientofficedash.component.css'],
})
export class ClientofficedashComponent implements OnInit {
  loader: boolean = false;
  OfficeLoactions: any;
  search: any;
  page: any;

  constructor(
    public TMS: TMS,
    private matDialog: MatDialog,
    public router: Router
  ) {}
  rating: any;
  ngOnInit(): void {
    this.getOfficeLoactions();
    this.loader = false;
    this.rating = 3;
  }

  async getOfficeLoactions() {
    this.TMS.GetOfficeLoactions().subscribe((res) => {
      debugger;
      this.OfficeLoactions = res;
    });
  }

  showDialog() {
    debugger;
    let ID = undefined;
    this.matDialog
      .open(ClientofficeaddComponent, {
        data: ID,
        width: '100%',
        maxHeight: '80vh',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
  edit(ID: any) {
    debugger;
    this.matDialog
      .open(ClientofficeaddComponent, {
        data: ID,
        width: '100%',
        maxHeight: '80vh',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  public openDeletePopUp(ID: any) {
    debugger;

    Swal.fire({
      title: 'Delete record',
      text: 'Are you sure you want to delete it?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed',
    }).then((result) => {
      if (result.value) {
        this.TMS.DeleteOfficeLocation(ID).subscribe({
          next: (data) => {
            Swal.fire('Deleted Successfully');
            this.ngOnInit();
          },
        });
      }
    });
  }
}
