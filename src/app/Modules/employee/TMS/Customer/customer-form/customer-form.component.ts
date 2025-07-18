import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
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
  constructor(public TMS: TMS,
    public router: Router,
    public dialogRef: MatDialogRef<CustomerFormComponent>, @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    this.getCountry();
    this.getState();
    this.getCity();
    this.getData();
  }

  public getCountry() {
    this.TMS.GetCountry().subscribe(
      res => {
        debugger;
        this.countryList = res;
        this.loader = false;
      })
  }
  public getState() {
    this.TMS.GetState().subscribe(
      res => {
        debugger;
        this.stateList = res;
        this.loader = false;
      })
  }
  public getCity() {
    this.TMS.GetCity().subscribe(
      res => {
        debugger;
        this.cityList = res;
        this.loader = false;
      })
  }
  public getData() {
    debugger
    this.TMS.GetCustomerByID(this.ID)
      .subscribe({
        next: data => {
          debugger
          this.customerList = data;
          this.loader = false;
          this.firstName = this.customerList[0].firstName;
          this.lastName = this.customerList[0].lastName;
          this.phoneNo = this.customerList[0].phoneNo;
          this.emailID = this.customerList[0].emailID;
          this.country = this.customerList[0].country;
          this.state = this.customerList[0].state;
          this.city = this.customerList[0].city;
          this.password = this.customerList[0].password;
          this.confirmPassword = this.customerList[0].confirmPassword;
        }
      })
  }
  // getpassword() {
  //   this.password = `${this.first || ''}${this.second || ''}${this.third || ''}${this.fourth || ''}`;
  //   console.log(this.password);

  // }
  getconfirmpassword() {
    debugger
    this.password = this.first + this.second + this.third + this.fourth;
    this.confirmPassword=this.first1+this.second1+this.third1+this.fourth1;
   if(this.password!=this.confirmPassword){
      Swal.fire('Please enter valid Password')
      this.first1='';
      this.second1='';
      this.third1='';
      this.fourth1='';
   }

  }
  public insertCustomer() {
    this.loader = true;
    this.showPopup = 0;
    debugger
    if (this.phoneNo.length == 10 && this.password == this.confirmPassword) {
      if (this.firstName == "" || this.firstName == undefined || this.lastName == "" || this.lastName == undefined || this.phoneNo == "" || this.phoneNo == undefined ||
        this.emailID == "" || this.emailID == undefined || this.country == "" || this.country == undefined || this.state == "" || this.state == undefined ||
        this.city == "" || this.city == undefined) {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 13;
      }
      else {
        var data = {
          'FirstName': this.firstName,
          'LastName': this.lastName,
          'PhoneNo': this.phoneNo,
          'EmailID': this.emailID,
          'Country': this.country,
          'State': this.state,
          'City': this.city,
          'Password': this.password,
          'ConfirmPassword': this.confirmPassword
        }
        this.TMS.InsertCustomer(data)
          .subscribe({
            next: data => {
              debugger
              // this.router.navigate(['/Employee/Customer']);
              this.dialogRef.close(false);
              this.loader = false;
              Swal.fire('Registration Completed Successfully');
              this.showPopup = 1;
              this.messageId = 8;
            }
          })
      }
    } else {
      Swal.fire('Please enter valid details');
      this.phoneNo = '';
      this.confirmPassword = '';
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
    debugger
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      'ID': this.ID,
      'FirstName': this.firstName,
      'LastName': this.lastName,
      'PhoneNo': this.phoneNo,
      'EmailID': this.emailID,
      'Country': this.country,
      'State': this.state,
      'City': this.city,
      'Password': this.password,
      'ConfirmPassword': this.confirmPassword
    }
    this.TMS.UpdateCustomer(eb)
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          Swal.fire('Customer Updated Successfully');
          this.showPopup = 1;
          this.messageId = 10;
          this.dialogRef.close(false);
          this.router.navigate(['/Employee/Customer']);
          this.loader = false;
        }
      })
  }

  validatePassword(): boolean {
    return this.password.length >= 4;
  }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}
