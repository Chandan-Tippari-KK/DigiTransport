import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaffDashComponent } from '../staff-dash/staff-dash.component';
import { TMS } from 'src/app/Services/TMS.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
})
export class StaffFormComponent implements OnInit {
  loader: any;
  zoom: number = 8;
  autocompleteOptions: any = {
    componentRestrictions: { country: 'IN' },
  };
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  staffData: any;
  departmentData: any;
  roleTypeData: any;
  showPopup: number = 0;
  messageId: number = 0;
  employeeCode: any;
  firstName: any;
  lastName: any;
  phoneNo: any;
  emailID: any;
  joiningDate: any;
  employeeStatus: any;
  gender: any;
  department: any;
  short: any;
  status: any;
  departmentID: any;
  roleID: any;
  isValidEmail: any;
  departmentName: any;
  idNumber: any;
  entityCode: any;
  uifStatus: any;
  jobGradeID: any;
  racialGroup: any;
  company: any;
  natureOfContract: any;
  jobTitleID: any;
  jobGradeData: any;
  jobTitleData: any;
  markers: any;
  AreaID: any;
  Longitude: any;
  Latitude: any;
  Distance: any;
  Address: any;
  employeeList: any[];
  ClientID: any;
  CompanyData: any;
  OfficeLoactionsData: any;
  AreaData: any;
  location: any;
  OfficeLoactionID: any;

  constructor(
    public TMS: TMS,
    private DatePipe: DatePipe,
    public router: Router,
    public dialogRef: MatDialogRef<StaffDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  ngOnInit() {
    this.loader = false;
    this.ClientID = 0;
    this.getClient();

    this.getData();
    this.getArea();
  }
  async getClient() {
    this.TMS.GetCompany().subscribe((res) => {
      debugger;
      this.CompanyData = res;
    });
  }

  async getArea() {
    this.TMS.GetAreaMaster().subscribe((res) => {
      debugger;
      this.AreaData = res;
    });
  }
  async getOfficeLocation(event: any) {
    this.TMS.GetOfficeLoactionsByClientID(event.target.value).subscribe(
      (res) => {
        debugger;
        this.OfficeLoactionsData = res;
      }
    );
  }
  public getData() {
    debugger;
    this.TMS.GetEmployeeByID(this.ID).subscribe({
      next: (data) => {
        debugger;
        this.employeeList = data;
        this.loader = false;
        this.employeeCode = this.employeeList[0].employeeCode;
        this.firstName = this.employeeList[0].firstName;
        this.lastName = this.employeeList[0].lastName;
        this.idNumber = this.employeeList[0].idNumber;
        this.joiningDate = this.employeeList[0].joiningDate;
        this.phoneNo = this.employeeList[0].phoneNumber;
        this.emailID = this.employeeList[0].emailID;
        this.gender = this.employeeList[0].gender;
        this.Address = this.employeeList[0].address;
        this.AreaID = this.employeeList[0].areaID;
        this.ClientID = this.employeeList[0].clientID;
        this.Longitude = this.employeeList[0].longitude;
        this.Latitude = this.employeeList[0].latitude;
        this.Distance = this.employeeList[0].distance;
        this.OfficeLoactionID = this.employeeList[0].officeLoactionID;
        this.TMS.GetOfficeLoactionsByClientID(
          this.employeeList[0].clientID
        ).subscribe((res) => {
          debugger;
          this.OfficeLoactionsData = res;
        });
      },
    });
  }

  public insertEmployee() {
    this.loader = true;
    this.showPopup = 0;
    debugger;
    //if (this.phoneNo.length == 10 && this.password == this.confirmPassword) {
    if (
      this.employeeCode == '' ||
      this.employeeCode == undefined ||
      this.firstName == '' ||
      this.firstName == undefined ||
      this.lastName == '' ||
      this.lastName == undefined ||
      this.idNumber == '' ||
      this.idNumber == undefined ||
      this.joiningDate == '' ||
      this.joiningDate == undefined ||
      this.phoneNo == '' ||
      this.phoneNo == undefined ||
      this.emailID == '' ||
      this.emailID == undefined ||
      this.gender == '' ||
      this.gender == undefined ||
      this.Address == '' ||
      this.Address == undefined ||
      this.AreaID == '' ||
      this.AreaID == undefined ||
      this.Longitude == '' ||
      this.Longitude == undefined ||
      this.Latitude == '' ||
      this.Latitude == undefined ||
      this.Distance == '' ||
      this.Distance == undefined
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var data = {
        EmployeeCode: this.employeeCode,
        FirstName: this.firstName,
        LastName: this.lastName,
        IdNumber: this.idNumber,
        JoiningDate: this.joiningDate,
        PhoneNumber: this.phoneNo,
        EmailID: this.emailID,
        Gender: this.gender,
        Address: this.Address,
        AreaID: this.AreaID,
        ClientID: this.ClientID,
        OfficeLoactionID: this.OfficeLoactionID,
        Longitude: this.Longitude,
        Latitude: this.Latitude,
        Distance: this.Distance,
      };
      this.TMS.InsertEmployee(data).subscribe({
        next: (data) => {
          debugger;
          this.dialogRef.close(false);
          this.loader = false;
          Swal.fire('Employee Inserted Successfully');
          this.showPopup = 1;
          this.messageId = 8;
        },
      });
    }
    // } else {
    //   Swal.fire('Please enter valid details');
    //   this.phoneNo = '';
    //   this.confirmPassword = '';
    // }
  }

  public updateEmployee() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      EmployeeCode: this.employeeCode,
      FirstName: this.firstName,
      LastName: this.lastName,
      IdNumber: this.idNumber,
      JoiningDate: this.joiningDate,
      PhoneNumber: this.phoneNo,
      EmailID: this.emailID,
      Gender: this.gender,
      Address: this.Address,
      AreaID: this.AreaID,
      ClientID: this.ClientID,
      OfficeLoactionID: this.OfficeLoactionID,
      Longitude: this.Longitude,
      Latitude: this.Latitude,
      Distance: this.Distance,
    };
    this.TMS.UpdateEmployee(eb).subscribe({
      next: (data) => {
        debugger;
        this.loader = false;
        Swal.fire('Employee Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10;
        this.dialogRef.close(false);
        //this.router.navigate(['/Employee/Customer']);
        this.loader = false;
      },
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  // mapClicked($event: any) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true,
  //   });
  // }

  // markerDragEnd(m: any, $event: any) {
  //   console.log('dragEnd', m, $event);
  // }
  // public getData() {
  //   debugger;
  //   this.TMS.GetStaffByID(this.ID).subscribe({
  //     next: (data) => {
  //       debugger;
  //       this.staffData = data;
  //       this.loader = false;
  //       this.employeeCode = this.staffData[0].employeeCode;
  //       this.firstName = this.staffData[0].firstName;
  //       this.lastName = this.staffData[0].lastName;
  //       this.phoneNo = this.staffData[0].phoneNo;
  //       this.emailID = this.staffData[0].emailID;
  //       this.joiningDate = this.DatePipe.transform(
  //         this.staffData[0].dateEngaged,
  //         'yyyy-MM-dd'
  //       );
  //       // this.employeeStatus = this.staffData[0].employeeStatus;
  //       this.gender = this.staffData[0].gender;
  //       this.departmentID = this.staffData[0].departmentID;
  //       this.roleID = this.staffData[0].roleID;
  //       this.idNumber = this.staffData[0].idNumber;
  //       this.entityCode = this.staffData[0].entityCode;
  //       this.company = this.staffData[0].company;
  //       this.racialGroup = this.staffData[0].racialGroup;
  //       this.uifStatus = this.staffData[0].uifStatus;
  //       this.natureOfContract = this.staffData[0].natureOfContract;
  //       this.jobGradeID = this.staffData[0].jobGradeID;
  //       this.jobTitleID = this.staffData[0].jobTitleID;
  //     },
  //   });
  // }
  // public getRoleType() {
  //   this.TMS.GetRoleType().subscribe((res) => {
  //     debugger;
  //     this.roleTypeData = res;
  //     this.loader = false;
  //   });
  // }
  // public getDepartment() {
  //   this.TMS.GetDepartment().subscribe((res) => {
  //     debugger;
  //     this.departmentData = res;
  //     this.loader = false;
  //   });
  // }
  // public getJobGrade() {
  //   this.TMS.GetJobGrade().subscribe((res) => {
  //     debugger;
  //     this.jobGradeData = res;
  //     this.loader = false;
  //   });
  // }
  // public getJobTitle() {
  //   this.TMS.GetJobTitle().subscribe((res) => {
  //     debugger;
  //     this.jobTitleData = res;
  //     this.loader = false;
  //   });
  // }
  // public insertStaff() {
  //   this.loader = true;
  //   this.showPopup = 0;
  //   debugger;
  //   if (this.phoneNo.length == 10) {
  //     if (
  //       this.employeeCode == '' ||
  //       this.employeeCode == undefined ||
  //       this.firstName == '' ||
  //       this.firstName == undefined ||
  //       this.lastName == '' ||
  //       this.lastName == undefined ||
  //       this.phoneNo == '' ||
  //       this.phoneNo == undefined ||
  //       this.emailID == '' ||
  //       this.emailID == undefined ||
  //       this.dateEngaged == '' ||
  //       this.dateEngaged == undefined ||
  //       this.gender == '' ||
  //       this.gender == undefined ||
  //       this.departmentID == '' ||
  //       this.departmentID == undefined ||
  //       this.roleID == '' ||
  //       this.roleID == undefined ||
  //       this.idNumber == '' ||
  //       this.idNumber == undefined ||
  //       this.entityCode == '' ||
  //       this.entityCode == undefined ||
  //       this.company == '' ||
  //       this.company == undefined ||
  //       this.racialGroup == '' ||
  //       this.racialGroup == undefined ||
  //       this.uifStatus == '' ||
  //       this.uifStatus == undefined ||
  //       this.natureOfContract == '' ||
  //       this.natureOfContract == undefined ||
  //       this.jobGradeID == '' ||
  //       this.jobGradeID == undefined ||
  //       this.jobTitleID == '' ||
  //       this.jobTitleID == undefined
  //     ) {
  //       this.loader = false;
  //       this.showPopup = 1;
  //       this.messageId = 13;
  //     } else {
  //       var data = {
  //         EmployeeCode: this.employeeCode,
  //         FirstName: this.firstName,
  //         LastName: this.lastName,
  //         PhoneNo: this.phoneNo,
  //         EmailID: this.emailID,
  //         DateEngaged: this.dateEngaged,
  //         // 'EmployeeStatus': this.employeeStatus,
  //         Gender: this.gender,
  //         DepartmentID: this.departmentID,
  //         RoleID: this.roleID,
  //         IDNumber: this.idNumber,
  //         EntityCode: this.entityCode,
  //         Company: this.company,
  //         RacialGroup: this.racialGroup,
  //         UIFStatus: this.uifStatus,
  //         NatureOfContract: this.natureOfContract,
  //         JobGradeID: this.jobGradeID,
  //         JobTitleID: this.jobTitleID,
  //       };
  //       this.TMS.InsertStaff(data).subscribe({
  //         next: (data) => {
  //           debugger;
  //           this.router.navigate(['/Employee/StaffDash']);
  //           this.dialogRef.close(false);
  //           this.loader = false;
  //           Swal.fire('Staff Inserted Successfully');
  //           this.showPopup = 1;
  //           this.messageId = 8;
  //         },
  //       });
  //     }
  //   } else {
  //     Swal.fire('Please enter valid details');
  //     this.phoneNo = '';
  //   }
  // }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = emailPattern.test(this.emailID);
  }

  public cancel() {
    location.href = '#/Employee/StaffDash';
    this.loader = false;
    this.dialogRef.close(false);
  }

  handleAddressChange(e: any) {
    console.log(e);
    this.Address = e.name;
    this.TMS.getLatlongbyaddreess(e.formatted_address).subscribe((res) => {
      debugger;
      var results: any = res;
      this.Longitude = results.results[0].geometry.location.lng;
      this.Latitude = results.results[0].geometry.location.lat;
      // console.log('lat', results.results[0].geometry.location.lat);
      // console.log('lng', results.results[0].geometry.location.lng);
    });
  }

  getdistance(event: any) {
    this.TMS.GetOfficeLoactions().subscribe((res) => {
      debugger;
      let location = res.filter((x) => x.id == event.target.value);
      let officelatlng = location[0].latitude + ',' + location[0].longitude;
      this.TMS.getdistancebylatlon(
        this.Latitude,
        this.Longitude,
        officelatlng
      ).subscribe((res) => {
        debugger;
        var reslts: any = res;
        this.Distance = reslts.routes[0].legs[0].distance.text.slice(0, 3);
      });
    });
  }
}
