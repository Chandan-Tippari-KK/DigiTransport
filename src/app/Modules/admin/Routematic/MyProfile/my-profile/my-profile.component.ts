import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TMS } from 'src/app/Services/TMS.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  messageId: number;
  showPopup: any;
  employeeCode: any;
  firstName: any;
  lastName: any;
  phoneNumber: any;
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
  address: any; 
  staffData: any;
  loader: any;
  ID:any;
  area: any;
  longitude: any;
  latitude: any;
  constructor(public TMS: TMS,
    private DatePipe: DatePipe,
    public router: Router, private activatedroute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      this.getData();
    }
    )
  }

  public getData() {
    debugger;
    this.TMS.GetEmployeeByID(this.ID).subscribe({
      next: (data) => {
        debugger;
        this.staffData = data.filter(x=>x.id==this.ID);
        this.loader = false;
        this.employeeCode = this.staffData[0].employeeCode;
        this.firstName = this.staffData[0].firstName;
        this.lastName = this.staffData[0].lastName;
        this.phoneNumber = this.staffData[0].phoneNumber;
        this.emailID = this.staffData[0].emailID;
        this.joiningDate = this.DatePipe.transform(
          this.staffData[0].joiningDate,
          'yyyy-MM-dd'
        );
        // this.employeeStatus = this.staffData[0].employeeStatus;
        this.gender = this.staffData[0].gender;
        this.address = this.staffData[0].address;
        this.area = this.staffData[0].area;
        this.longitude = this.staffData[0].longitude;
        this.latitude = this.staffData[0].latitude;
        this.departmentID = this.staffData[0].departmentID;
        this.roleID = this.staffData[0].roleID;
        this.idNumber = this.staffData[0].idNumber;
        this.entityCode = this.staffData[0].entityCode;
        this.company = this.staffData[0].company;
        this.racialGroup = this.staffData[0].racialGroup;
        this.uifStatus = this.staffData[0].uifStatus;
        this.natureOfContract = this.staffData[0].natureOfContract;
        this.jobGradeID = this.staffData[0].jobGradeID;
        this.jobTitleID = this.staffData[0].jobTitleID;
      },
    });
  }
  
  public UpdateStaff() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      employeeCode: this.employeeCode,
      firstName: this.firstName,
      lastName: this.lastName,
      idNumber: this.idNumber,
      joiningDate: this.joiningDate,
      phoneNumber: this.phoneNumber,
      emailID: this.emailID,
      gender: this.gender,
      address: this.address,
      area: this.area,
      longitude: this.longitude,
      latitude: this.latitude, 
    };
    this.TMS.UpdateEmployee(eb).subscribe({
      next: (data) => {
        debugger;
        this.loader = false;
        Swal.fire('Employee Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10; 
        this.loader = false;
      },
    });
  }
}
