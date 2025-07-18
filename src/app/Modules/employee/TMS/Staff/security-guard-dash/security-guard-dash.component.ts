import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TMS } from 'src/app/Services/TMS.service';
import { SecurityGuardFormComponent } from '../security-guard-form/security-guard-form.component';

@Component({
  selector: 'app-security-guard-dash',
  templateUrl: './security-guard-dash.component.html',
  styleUrls: ['./security-guard-dash.component.css']
})
export class SecurityGuardDashComponent implements OnInit { 
  loader: boolean = false; 
  search: any;
  page: any;
  StaffGuardData: any;

  constructor(
    public TMS: TMS,
    private matDialog: MatDialog,
    public router: Router
  ) {}
  rating: any;
  ngOnInit(): void {
    this.getStaffGuard();
    this.loader = false;
    this.rating = 3;
  }

   
  showDialog() {
    debugger;
    let ID = undefined;
    this.matDialog
      .open( SecurityGuardFormComponent, {
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
      .open(SecurityGuardFormComponent, {
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
        this.TMS.DeleteStaffGuard(ID).subscribe({
          next: (data) => {
            Swal.fire('Deleted Successfully');
            this.ngOnInit();
          },
        });
      }
    });
  }

  async getStaffGuard() {
    this.TMS.GetStaffGuard().subscribe((res) => {
      debugger;
      this.StaffGuardData = res;
    });
  }
}
