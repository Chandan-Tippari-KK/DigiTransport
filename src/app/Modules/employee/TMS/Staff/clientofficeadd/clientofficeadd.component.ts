import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-clientofficeadd',
  templateUrl: './clientofficeadd.component.html',
  styleUrls: ['./clientofficeadd.component.css'],
})
export class ClientofficeaddComponent implements OnInit {
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
  ClientID: undefined;
  CompanyData: any;
  constructor(
    public TMS: TMS,
    public router: Router,
    public dialogRef: MatDialogRef<ClientofficeaddComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  ngOnInit(): void {
    this.getCompanyData();
  }

  async getCompanyData() {
    this.TMS.GetCompany().subscribe((res) => {
      debugger;
      this.CompanyData = res;
    });
  }

  public insertOfficeLocation() {
    this.loader = true;
    this.showPopup = 0;
    debugger;
    if (
      this.ClientID == '' ||
      this.ClientID == undefined ||
      this.OfficeCode == '' ||
      this.OfficeCode == undefined
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var data = {
        ClientID: this.ClientID,
        LocationName: this.LocationName,
        OfficeLoactionCode: this.OfficeCode,
        Latitude: this.lat,
        Longitude: this.lng,
      };
      this.TMS.InsertOfficeLoactions(data).subscribe({
        next: (data) => {
          debugger;
          this.dialogRef.close(false);
          this.loader = false;
          Swal.fire('Data Saved Successfully');
          this.showPopup = 1;
          this.messageId = 8;
        },
      });
    }
  }

  public updateOfficeLocation() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
  }

  public cancel() {
    this.loader = false;
    this.dialogRef.close(false);
  }
  lat: any;
  lng: any;
  LocationName: any;
  handleAddressChange(e: any) {
    console.log(e.formatted_address);
    this.LocationName = e.formatted_address;
    this.TMS.getLatlongbyaddreess(e.formatted_address).subscribe((res) => {
      debugger;
      var results: any = res;
     
      // console.log('lat', results.results[0].geometry.location.lat);
      // console.log('lng', results.results[0].geometry.location.lng);
    
    });
  }
}
