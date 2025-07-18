import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtripdeatils',
  templateUrl: './addtripdeatils.component.html',
  styleUrls: ['./addtripdeatils.component.css'],
})
export class AddtripdeatilsComponent implements OnInit {
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
  triptype: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  ShiftTime: any;
  Vehicle_Reg_No: string = '';
  Route_No: string = '';
  Date: any;
  pickuplocation: any;
  employeetripsList: any[];
  OfficeLoaction: any;
  OfficeLoactionsdata: any[];
  LocationID: any;
  constructor(
    public TMS: TMS,
    public router: Router,
    public dialogRef: MatDialogRef<AddtripdeatilsComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  ngOnInit(): void {
    this.country = 0;

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.getData();
    this.getaddress();
    this.getOfficeLocation();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  OfficeLoactions: any;
  clinetID: any;
  public getaddress() {
    this.TMS.GetEmployee().subscribe((res) => {
      debugger;
      let temp: any = res.filter(
        (x) => (x.id = sessionStorage.getItem('empid'))
      );
      this.pickuplocation = temp[0].address;
      this.clinetID = temp[0].clientID;
      this.TMS.GetOfficeLoactions().subscribe((res) => {
        debugger;
        this.OfficeLoactions = res.filter((x) => x.clientID == this.clinetID);
      });
      this.loader = false;
    });
  }
  public getOfficeLocation() {
    this.TMS.GetOfficeLoactions().subscribe((res) => {
      debugger;
      this.OfficeLoactionsdata = res;
    });
  }
  public getData() {
    debugger;
    this.TMS.GetEmployeeTripsByID(this.ID).subscribe({
      next: (data) => {
        debugger;
        this.employeetripsList = data;
        this.loader = false;
        this.Date = this.employeetripsList[0].date;
        this.triptype = this.employeetripsList[0].tripType;
        this.ShiftTime = this.employeetripsList[0].shiftTime;
        this.pickuplocation = this.employeetripsList[0].locationName;
        this.LocationID = this.employeetripsList[0].locationID;
      },
    });
  }
  // getpassword() {
  //   this.password = `${this.first || ''}${this.second || ''}${this.third || ''}${this.fourth || ''}`;
  //   console.log(this.password);

  // }
  getconfirmpassword() {
    debugger;
    this.password = this.first + this.second + this.third + this.fourth;
    this.confirmPassword =
      this.first1 + this.second1 + this.third1 + this.fourth1;
    if (this.password != this.confirmPassword) {
      Swal.fire('Please enter valid Password');
      this.first1 = '';
      this.second1 = '';
      this.third1 = '';
      this.fourth1 = '';
    }
  }

  public insertEmployeeTrips() {
    this.loader = true;
    this.showPopup = 0;
    debugger;
    //if (this.phoneNo.length == 10 && this.password == this.confirmPassword) {
    if (
      this.Date == '' ||
      this.Date == undefined ||
      this.triptype == '' ||
      this.triptype == undefined ||
      this.ShiftTime == '' ||
      this.ShiftTime == undefined
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var data = {
        Date: this.Date,
        EmpID: sessionStorage.getItem('empid'),
        TripType: this.triptype,
        ShiftTime: this.ShiftTime,
        LocationID: this.LocationID,
      };
      this.TMS.InsertEmployeeTrips(data).subscribe({
        next: (data) => {
          debugger;
          // this.router.navigate(['/Employee/Customer']);
          this.dialogRef.close(false);
          this.loader = false;
          Swal.fire('Data Saved Successfully');
          this.showPopup = 1;
          this.messageId = 8;
        },
      });
    }
    //} else {
    //Swal.fire('Please enter valid details');
    //this.phoneNo = '';
    //this.confirmPassword = '';
    //}
  }
  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }
  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = emailPattern.test(this.emailID);
  }

  public updateEmployeeTrips() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      Date: this.Date,
      EmpID: sessionStorage.getItem('empid'),
      TripType: this.triptype,
      ShiftTime: this.ShiftTime,
      LocationID: this.LocationID,
    };
    this.TMS.UpdateEmployeeTrips(eb).subscribe({
      next: (data) => {
        debugger;
        this.loader = false;
        Swal.fire('EmployeeTrips Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10;
        this.dialogRef.close(false);
        //this.router.navigate(['/Employee/Customer']);
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
