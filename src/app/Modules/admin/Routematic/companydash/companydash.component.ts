import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import { AddcompanyComponent } from '../addcompany/addcompany.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companydash',
  templateUrl: './companydash.component.html',
  styleUrls: ['./companydash.component.css'],
})
export class CompanydashComponent implements OnInit {
  loader: any;
  customerList: any;
  search: any;
  showPopup: any;
  staffList: any;
  firstName: any;
  lastName: any;
  phoneNo: any;
  emailID: any;
  country: any;
  state: any;
  city: any;
  messageId: any;
  stateData: any;
  cityData: any;
  customerListCopy: any;
  page: any = 1;
  CompanyData: any;

  constructor(
    public TMS: TMS,
    private matDialog: MatDialog,
    public router: Router
  ) {}
  rating: any;
  ngOnInit(): void {
    this.getCompanyData();
    this.loader = false;
    this.rating = 3;
  }

  showDialog() {
    debugger;
    let ID = undefined;
    this.matDialog
      .open(AddcompanyComponent, {
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
      .open(AddcompanyComponent, {
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

  async getCompanyData() {
    this.TMS.GetCompany().subscribe((res) => {
      debugger;
      this.CompanyData = res;
    });
  }

  public openDeletePopUp(ID: any) {
    debugger;
    this.showPopup = 0;
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
        this.TMS.DeleteCompany(ID).subscribe({
          next: (data) => {
            Swal.fire('Deleted Successfully');
            this.ngOnInit();
          },
        });
      }
    });
  }

  public Enable_Client(id: any) {
    this.showPopup = 0;
    var eb = {
      ID: id,
      active: 1,
    };
    this.TMS.Enable_Client(eb).subscribe((data) => {
      debugger;
      Swal.fire('Enabled Successfully.');
      this.loader = false;
      this.showPopup = 1;

      this.ngOnInit();
    });
  }

  public Disable_Client(id: any) {
    this.showPopup = 0;
    var eb = {
      ID: id,
      active: 0,
    };
    this.TMS.Enable_Client(eb).subscribe((data) => {
      debugger;
      Swal.fire('Disabled Successfully.');
      this.loader = false;
      this.showPopup = 1;

      this.ngOnInit();
    });
  }
}
