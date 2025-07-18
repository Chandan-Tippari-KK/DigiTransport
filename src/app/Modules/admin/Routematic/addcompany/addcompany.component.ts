import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css'],
})
export class AddcompanyComponent implements OnInit {
  autocompleteOptions: any = {
    componentRestrictions: { country: 'IN' },
  };
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  loader: any;
  showPopup: any;
  messageId: any;

  CompanyName: any;
  Address: any;
  MobileNumber: any;
  Email: any;
  Area: any;
  OfficeLocation: any;
  OfficeCode: any;
  OfficeLocation2: any;
  OfficeCode2: any;
  OfficeLocation3: any;
  OfficeCode3: any;
  OfficeLocation4: any;
  OfficeCode4: any;
  OfficeLocation5: any;
  OfficeCode5: any;
  OfficeLocation1: any;
  OfficeCode1: any;
  companyList: any[];
  constructor(
    public TMS: TMS,
    public router: Router,
    public dialogRef: MatDialogRef<AddcompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  public getData() {
    debugger;
    this.TMS.GetCompanyByID(this.ID).subscribe({
      next: (data) => {
        debugger;
        this.companyList = data;
        this.loader = false;
        this.CompanyName = this.companyList[0].companyName;
        this.Address = this.companyList[0].address;
        this.MobileNumber = this.companyList[0].mobileNumber;
        this.Email = this.companyList[0].email;
        this.Area = this.companyList[0].area;
        this.OfficeLocation = this.companyList[0].officeLocation;
        this.OfficeCode = this.companyList[0].officeCode;
        this.OfficeLocation1 = this.companyList[0].officeLocation1;
        this.OfficeCode1 = this.companyList[0].officeCode1;
        this.OfficeLocation2 = this.companyList[0].officeLocation2;
        this.OfficeCode2 = this.companyList[0].officeCode2;
        this.OfficeLocation3 = this.companyList[0].officeLocation3;
        this.OfficeCode3 = this.companyList[0].officeCode3;
        this.OfficeLocation4 = this.companyList[0].officeLocation4;
        this.OfficeCode4 = this.companyList[0].officeCode4;
        this.OfficeLocation5 = this.companyList[0].officeLocation5;
        this.OfficeCode5 = this.companyList[0].officeCode5;
      },
    });
  }

  public insertCompany() {
    this.loader = true;
    this.showPopup = 0;
    debugger;
    //if (this.phoneNo.length == 10 && this.password == this.confirmPassword) {
    if (
      this.CompanyName == '' ||
      this.CompanyName == undefined ||
      this.Address == '' ||
      this.Address == undefined ||
      this.MobileNumber == '' ||
      this.MobileNumber == undefined ||
      this.Email == '' ||
      this.Email == undefined ||
      this.Area == '' ||
      this.Area == undefined ||
      this.OfficeLocation == '' ||
      this.OfficeLocation == undefined ||
      this.OfficeCode == '' ||
      this.OfficeCode == undefined
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var data = {
        CompanyName: this.CompanyName,
        Address: this.Address,
        MobileNumber: this.MobileNumber,
        Email: this.Email,
        Area: this.Area,
        OfficeLocation: this.OfficeLocation,
        OfficeCode: this.OfficeCode,
        OfficeLocation1: this.OfficeLocation1,
        OfficeCode1: this.OfficeCode1,
        OfficeLocation2: this.OfficeLocation2,
        OfficeCode2: this.OfficeCode2,
        OfficeLocation3: this.OfficeLocation3,
        OfficeCode3: this.OfficeCode3,
        OfficeLocation4: this.OfficeLocation4,
        OfficeCode4: this.OfficeCode4,
        OfficeLocation5: this.OfficeLocation5,
        OfficeCode5: this.OfficeCode5,
      };
      this.TMS.InsertCompany(data).subscribe({
        next: (data) => {
          debugger;
          this.dialogRef.close(false);
          this.loader = false;
          Swal.fire('Company Inserted Successfully');
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

  public updateCompany() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      CompanyName: this.CompanyName,
      Address: this.Address,
      MobileNumber: this.MobileNumber,
      Email: this.Email,
      Area: this.Area,
      OfficeLocation: this.OfficeLocation,
      OfficeCode: this.OfficeCode,
      OfficeLocation1: this.OfficeLocation1,
      OfficeCode1: this.OfficeCode1,
      OfficeLocation2: this.OfficeLocation2,
      OfficeCode2: this.OfficeCode2,
      OfficeLocation3: this.OfficeLocation3,
      OfficeCode3: this.OfficeCode3,
      OfficeLocation4: this.OfficeLocation4,
      OfficeCode4: this.OfficeCode4,
      OfficeLocation5: this.OfficeLocation5,
      OfficeCode5: this.OfficeCode5,
    };
    this.TMS.UpdateCompany(eb).subscribe({
      next: (data) => {
        debugger;
        this.loader = false;
        Swal.fire('Company Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10;
        this.dialogRef.close(false);
        //this.router.navigate(['/Employee/Customer']);
        this.loader = false;
      },
    });
  }

  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }

  handleAddressChange(e: any) {
    console.log(e.formatted_address);

    this.TMS.getLatlongbyaddreess(e.formatted_address).subscribe((res) => {
      debugger;
      var results: any = res;

      // console.log('lat', results.results[0].geometry.location.lat);
      // console.log('lng', results.results[0].geometry.location.lng);
    });
  }
}
