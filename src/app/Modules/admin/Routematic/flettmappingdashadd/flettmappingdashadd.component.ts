import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flettmappingdashadd',
  templateUrl: './flettmappingdashadd.component.html',
  styleUrls: ['./flettmappingdashadd.component.css'],
})
export class FlettmappingdashaddComponent implements OnInit {
  loader: any;
  firstName: any;
  lastName: any;
  phoneNo: any;
  emailID: any;
  country: any;
  state: any;
  city: any;
  showPopup: any;
  messageId: any;
  countryList: any;
  stateList: any;
  cityList: any;
  isValidEmail: any;
  customerList: any;
  password: any;
  confirmPassword: any;
  first: any;
  second: any;
  third: any;
  fourth: any;
  first1: any;
  second1: any;
  third1: any;
  fourth1: any;

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  Vehicle_Reg_No: string = '';
  Route_No: string = '';
  RouteData: any;
  Fleetlist: any;
  vehicleType: any;
  constructor(
    public TMS: TMS,
    public router: Router,
    public dialogRef: MatDialogRef<FlettmappingdashaddComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  ngOnInit(): void {
    this.TMS.GetRouteNumber().subscribe((res) => {
      debugger;
      this.RouteData = res;
    });

    console.log('a', this.ID);
  }
  DriverData:any;
  getfleet() {
    debugger;
    this.TMS.GetFleet().subscribe((res) => {
      debugger;
      this.Fleetlist = res.filter((x) => x.vehicleType == this.vehicleType);
    });
    this.TMS.GetDriver().subscribe((res) => {
      debugger;
      this.DriverData = res;
      
    });
  }

  RouteID: any;
  FleetID: any;

  DailyTripID: any;
  TripType: any;
  OfficeLocationID: any;
  Date: any;
  DriverID: any;
  
  generateOtp(){
    var val = Math.floor(1000 + Math.random() * 9000);
    return val;
  }
  public insertCustomer() {
    this.loader = true;
    var data = {
      FleetID: this.FleetID,
      DriverID:this.DriverID,
      RouteID:  this.ID[0].routeID,
      TripType:this.ID[0].tripType,
      DropLocation: this.ID[0].droplocationid,
      Date: this.ID[0].date,
      Otp:this.generateOtp()
    };
    this.TMS.InsertDailyTrips(data).subscribe({
      next: (data) => {
        debugger;
        this.DailyTripID = data;
        this.InsertDailyTripsDetails();
        // this.router.navigate(['/Employee/Customer']);
      },
    });
  }

  public InsertDailyTripsDetails() {
    for (let i = 0; i <= this.ID.length; i++) {
      var obj = {
        DailyTripID: this.DailyTripID,
        EmployeeID: this.ID[i].empid,
        Date: this.ID[i].date,
        Otp:this.generateOtp(),
        ShiftTime:this.ID[i].ShiftTime,
        Category:this.ID[i].category
      };
      this.TMS.InsertDailyTripsDetails(obj).subscribe({
        next: (data) => {
          debugger;
          // this.router.navigate(['/Employee/Customer']);
          this.dialogRef.close(false);
          this.loader = false;
          Swal.fire('Vehicle Assigned Successfully');
          this.showPopup = 1;
          this.messageId = 8;
        },
      });
    }
  }
  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }
  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = emailPattern.test(this.emailID);
  }

  public UpdateCustomer() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      FirstName: this.firstName,
      LastName: this.lastName,
      PhoneNo: this.phoneNo,
      EmailID: this.emailID,
      Country: this.country,
      State: this.state,
      City: this.city,
      Password: this.password,
      ConfirmPassword: this.confirmPassword,
    };
    this.TMS.UpdateCustomer(eb).subscribe({
      next: (data) => {
        debugger;
        this.loader = false;
        Swal.fire('Customer Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10;
        this.dialogRef.close(false);
        this.router.navigate(['/Employee/Customer']);
        this.loader = false;
      },
    });
  }

  validatePassword(): boolean {
    return this.password.length >= 4;
  }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}
