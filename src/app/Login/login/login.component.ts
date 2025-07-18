import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TMS } from '../../Services/TMS.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from 'src/app/Modules/employee/TMS/Customer/customer-form/customer-form.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public TMS: TMS,
    public router: Router,
    private matDialog: MatDialog
  ) {}
  showpassword: any;
  public RoleID: any;
  showPopup: number = 0;
  messageId: number = 0;
  username: any;
  loader: any;
  first: any;
  second: any;
  third: any;
  fourth: any;
  password: String = '';
  id: any;
  public arrayofimages: any = [
    'assets/Images/sidebaricons/images-01.png',
    'assets/Images/sidebaricons/images-02.png',
    'assets/Images/sidebaricons/images-03.png',
    'assets/Images/sidebaricons/images-04.png',
    'assets/Images/sidebaricons/images-05.png',
    'assets/Images/sidebaricons/images-06.png',
  ];

  ngOnInit(): void {
    this.showpassword = 0;
    this.getimagefordash();
    if (sessionStorage.getItem('temp') == '1') {
      localStorage.clear();
      location.reload();
    }
  }
  imgurl: any;
  public getimagefordash() {
    var a = Math.floor(Math.random() * this.arrayofimages.length);
    this.imgurl = this.arrayofimages[a];
  }

  Showhidepassword() {
    debugger;
    if (this.showpassword == 0) {
      this.showpassword = 1;
    } else {
      this.showpassword = 0;
    }
  }

  public login() {
    debugger;
    this.loader = true;

    if (this.RoleID == 3) {
      this.TMS.GetEmployee().subscribe((data: any) => {
        debugger;

        let temp: any = data.filter(
          (x: { emailID: any }) => x.emailID == this.username
        );
        if (temp.length == 0) {
          this.loader = false;
          Swal.fire('Invalid EmailID');
        } else {
          sessionStorage.setItem('roledid', this.RoleID);
          sessionStorage.setItem('empid', temp[0].id);
          Swal.fire('Successfully Logged in');
          if (1 == 1) {
            this.router.navigate(['/admin/MyProfile/',temp[0].id]).then(() => {
              location.reload();
              this.loader = false;
            });
          }
        }
      });
    } else {
      sessionStorage.setItem('roledid', this.RoleID);
      sessionStorage.setItem('staffid', this.RoleID);
      Swal.fire('Successfully Logged in');
      if (1 == 1) {
        this.router.navigate(['/admin/Companydash']).then(() => {
          location.reload();
          this.loader = false;
        });
      }
    }

    // this.TMS.GetStaffDeatilsforLogin(this.RoleID, this.username, this.password).subscribe(
    //   res => {
    //     debugger;

    //     if (res.length == 0) {
    //       Swal.fire('Please Enter Valid Details');
    //     } else {

    //       let temp: any = res;
    //       sessionStorage.setItem('roledid', temp[0].roleID);
    //       sessionStorage.setItem('staffid', temp[0].id);
    //       Swal.fire('Successfully logged in')
    //       if(temp[0].roleID==1){
    //         this.router.navigate(['/Employee/NewTickets']).then(() => {
    //           this.loader = false;
    //           location.reload();
    //         })
    //       }else{
    //         this.router.navigate(['/Employee/StaffDash']).then(() => {
    //           this.loader = false;
    //           location.reload();
    //         })
    //       }

    //     }
    //   })
  }

  GetloginType(event: any) {
    this.RoleID = event.target.value;
  }
  showDialog() {
    debugger;
    let ID = undefined;
    this.matDialog
      .open(CustomerFormComponent, {
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
}
