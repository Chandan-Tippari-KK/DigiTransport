import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adddriver',
  templateUrl: './adddriver.component.html',
  styleUrls: ['./adddriver.component.css'],
})
export class AdddriverComponent implements OnInit {
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

  Vehicle_Reg_No: string = '';
  Route_No: string = '';
  DriverName: any;
  DriverCode: any;
  FatherName: any;
  PresentAddress: any;
  PermanentAddress: any;
  AddressonLicense: any;
  VehicleRegNo: any;
  EmailID: any;
  DateOfBirth: any;
  MobileNo: any;
  TripSheetMobileNo: any;
  AlternateNo: any;
  EmergencyContactNo: any;
  LicenseNo: any;
  LicenseExpiryDate: any;
  DrivingLicenseIssuanceAuthority: any;
  DrivingLicenseIssuanceDate: any;
  SupplierJoiningDate: any;

  Experience: any;
  IDCardIssued: any;
  Badge: any;
  BadgeNo: any;
  BadgeExpDate: any;
  DriverInductionDate: any;
  BloodGroup: any;
  DriveType: any;
  MedicalFitnessDone: any;
  MedicalFitnessDate: any;
  MedicalFitnessExpiryDate: any;
  driverList: any[];
  PoliceVerificationDone: any;
  PoliceVerificationDate: any;
  PoliceVerificationExpiryDate: any;
  InternalVerification: any;
  GovermentIDProof: any;
  Locality: any;
  VaccinationStatus: any;
  public drivinglicenseattachment: any = [];
  public attachments: any = [];
  //attachment: any;
  public attachmentsurl: any = [];
  DrivingLicense: any;
  MedicalCertificate: any;
  AadharCard: any;
  NdcForm: any;
  DriverPhoto: any;
  FleetID: any;
  fleetdata: any;

  constructor(
    public TMS: TMS,
    public router: Router,
    public dialogRef: MatDialogRef<AdddriverComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  ngOnInit(): void {
    //this.country = 0;
    //this.getCountry();
    //this.getState();
    //this.getCity();
    this.getData();
    this.getFleet();
  }

  public getData() {
    debugger;
    this.TMS.GetDriverByID(this.ID).subscribe({
      next: (data) => {
        debugger;
        this.driverList = data;
        this.loader = false;
        this.DriverName = this.driverList[0].driverName;
        this.DriverCode = this.driverList[0].driverCode;
        this.FatherName = this.driverList[0].fatherName;
        this.PresentAddress = this.driverList[0].presentAddress;
        this.PermanentAddress = this.driverList[0].permanentAddress;
        this.AddressonLicense = this.driverList[0].addressOnLicense;
        this.VehicleRegNo = this.driverList[0].vehicleRegNo;
        this.DateOfBirth = this.driverList[0].dateOfBirth;
        this.MobileNo = this.driverList[0].mobileNo;
        this.TripSheetMobileNo = this.driverList[0].tripSheetMobileNo;
        this.AlternateNo = this.driverList[0].alternateNo;
        this.EmergencyContactNo = this.driverList[0].emergencyContactNo;
        this.LicenseNo = this.driverList[0].licenseNo;
        this.LicenseExpiryDate = this.driverList[0].licenseExpiryDate;
        this.DrivingLicenseIssuanceAuthority =
          this.driverList[0].drivingLicenseIssuanceAuthority;

        this.DrivingLicenseIssuanceDate =
          this.driverList[0].drivingLicenseIssuanceDate;
        this.SupplierJoiningDate = this.driverList[0].supplierJoiningDate;
        this.Experience = this.driverList[0].experience;
        this.Badge = this.driverList[0].badge;
        this.BadgeNo = this.driverList[0].badgeNo;
        this.BadgeExpDate = this.driverList[0].badgeExpDate;
        this.DriverInductionDate = this.driverList[0].driverInductionDate;
        this.BloodGroup = this.driverList[0].bloodGroup;
        this.DriveType = this.driverList[0].driveType;
        this.MedicalFitnessDone = this.driverList[0].medicalFitnessDone;
        this.MedicalFitnessDate = this.driverList[0].medicalFitnessDate;
        this.MedicalFitnessExpiryDate =
          this.driverList[0].medicalFitnessExpiryDate;
        this.PoliceVerificationDone = this.driverList[0].policeVerificationDone;
        this.PoliceVerificationDate = this.driverList[0].policeVerificationDate;
        this.PoliceVerificationExpiryDate =
          this.driverList[0].policeVerificationExpiryDate;
        this.InternalVerification = this.driverList[0].internalVerification;
        this.GovermentIDProof = this.driverList[0].govermentIdProof;
        this.Locality = this.driverList[0].locality;
        this.VaccinationStatus = this.driverList[0].vaccinationStatus;
        this.FleetID = this.driverList[0].vehicleRegNo;
        this.DrivingLicense = this.driverList[0].drivingLicense;
      },
    });
  }

  public getFleet() {
    this.TMS.GetFleet().subscribe((res) => {
      debugger;
      this.fleetdata = res;
      this.loader = false;
    });
  }

  onRemove21(event: any) {
    this.drivinglicenseattachment.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger;
    this.showPopup = 0;
    this.drivinglicenseattachment.length = 0;
    if (event.addedFiles[0].size / 1048576 > 2) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 14;
    } else {
      const uploadedFiles: File[] = event.addedFiles;
      for (const file of uploadedFiles) {
        try {
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          img.onload = async () => {
            if (event.addedFiles[0].size > 5242880) {
              Swal.fire(
                'Please upload a file that is less than or equal to 5 MB.'
              );
              this.drivinglicenseattachment.length = 0;
            } else {
              this.drivinglicenseattachment.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          };
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      }
    }
  }

  public submit() {
    debugger;
    this.showPopup = 0;
    debugger;
    this.loader = true;
    if (this.drivinglicenseattachment.length == 0) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      this.TMS.ProjectAttachments(this.drivinglicenseattachment).subscribe({
        next: (data) => {
          debugger;
          this.attachmentsurl.push(data);
          this.attachments.length = 0;
          this.InsertDrivers();
          this.loader = false;
        },
      });
    }
  }

  public InsertDrivers() {
    this.loader = true;
    this.showPopup = 0;
    debugger;

    if (
      this.DriverName == undefined ||
      this.DriverName == '' ||
      this.DriverCode == undefined ||
      this.DriverCode == '' ||
      this.FatherName == undefined ||
      this.FatherName == '' ||
      this.PresentAddress == undefined ||
      this.PresentAddress == '' ||
      this.PermanentAddress == undefined ||
      this.PermanentAddress == '' ||
      this.AddressonLicense == undefined ||
      this.AddressonLicense == '' ||
      this.VehicleRegNo == undefined ||
      this.VehicleRegNo == '' ||
      this.MobileNo == undefined ||
      this.MobileNo == '' ||
      this.TripSheetMobileNo == undefined ||
      this.TripSheetMobileNo == '' ||
      this.LicenseNo == undefined ||
      this.LicenseNo == '' ||
      this.DrivingLicenseIssuanceAuthority == undefined ||
      this.DrivingLicenseIssuanceAuthority == '' ||
      this.DrivingLicenseIssuanceDate == undefined ||
      this.DrivingLicenseIssuanceDate == '' ||
      this.SupplierJoiningDate == undefined ||
      this.SupplierJoiningDate == '' ||
      this.Experience == undefined ||
      this.Experience == '' ||
      this.BadgeNo == undefined ||
      this.BadgeNo == ''
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        DriverName: this.DriverName,
        DriverCode: this.DriverCode,
        FatherName: this.FatherName,
        PresentAddress: this.PresentAddress,
        PermanentAddress: this.PermanentAddress,
        AddressonLicense: this.AddressonLicense,
        VehicleRegNo: this.VehicleRegNo,
        DateOfBirth: this.DateOfBirth,
        MobileNo: this.MobileNo,
        TripSheetMobileNo: this.TripSheetMobileNo,
        AlternateNo: this.AlternateNo,
        EmergencyContactNo: this.EmergencyContactNo,
        LicenseNo: this.LicenseNo,
        LicenseExpiryDate: this.LicenseExpiryDate,
        DrivingLicenseIssuanceAuthority: this.DrivingLicenseIssuanceAuthority,
        DrivingLicenseIssuanceDate: this.DrivingLicenseIssuanceDate,
        SupplierJoiningDate: this.SupplierJoiningDate,
        Experience: this.Experience,
        Badge: this.Badge,
        BadgeNo: this.BadgeNo,
        BadgeExpDate: this.BadgeExpDate,
        DriverInductionDate: this.DriverInductionDate,
        BloodGroup: this.BloodGroup,
        DriverType: this.DriveType,
        MedicalFitnessDone: this.MedicalFitnessDone,
        MedicalFitnessDate: this.MedicalFitnessDate,
        MedicalFitnessExpiryDate: this.MedicalFitnessExpiryDate,
        PoliceVerificationDone: this.PoliceVerificationDone,
        PolicaVerificationDate: this.PoliceVerificationDate,
        PoliceVerificationExpiryDate: this.PoliceVerificationExpiryDate,
        InternalVerification: this.InternalVerification,
        GovermentIdProof: this.GovermentIDProof,
        Locality: this.Locality,
        VaccinationStatus: this.VaccinationStatus,
        FleetID: this.FleetID,
        DrivingLicense: this.DrivingLicense,
        MedicalCertificate: this.MedicalCertificate,
        AadharCard: this.AadharCard,
        NdcForm: this.NdcForm,
        DriverPhoto: this.DriverPhoto,
      };
      this.TMS.InsertDriver(eb).subscribe({
        next: (data) => {
          debugger;
          if (data == 0) {
            debugger;
            //this.messageId = 213;

            Swal.fire('Fleet Already exist');

            this.loader = false;
          } else {
            this.dialogRef.close(false);
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8;
          }
        },
      });
    }
  }

  public update() {
    this.uploadocx();
    this.UpdateDrivers();
  }

  uploadocx() {
    debugger;
    this.TMS.ProjectAttachments(this.drivinglicenseattachment).subscribe({
      next: (data) => {
        debugger;
        this.attachmentsurl.push(data);
        //this.attachments.length = 0;
        this.loader = false;
      },
    });
  }

  // public update() {
  //   debugger;
  //   this.TMS.ProjectAttachments(this.drivinglicenseattachment).subscribe({
  //     next: (data) => {
  //       debugger;
  //       this.attachmentsurl.push(data);
  //       this.attachments.length = 0;
  //       this.UpdateDrivers();
  //       this.loader = false;
  //     },
  //   });
  // }

  public UpdateDrivers() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      DriverName: this.DriverName,
      DriverCode: this.DriverCode,
      FatherName: this.FatherName,
      PresentAddress: this.PresentAddress,
      PermanentAddress: this.PermanentAddress,
      AddressonLicense: this.AddressonLicense,
      VehicleRegNo: this.VehicleRegNo,
      DateOfBirth: this.DateOfBirth,
      MobileNo: this.MobileNo,
      TripSheetMobileNo: this.TripSheetMobileNo,
      AlternateNo: this.AlternateNo,
      EmergencyContactNo: this.EmergencyContactNo,
      LicenseNo: this.LicenseNo,
      LicenseExpiryDate: this.LicenseExpiryDate,
      DrivingLicenseIssuanceAuthority: this.DrivingLicenseIssuanceAuthority,
      DrivingLicenseIssuanceDate: this.DrivingLicenseIssuanceDate,
      SupplierJoiningDate: this.SupplierJoiningDate,
      Experience: this.Experience,
      Badge: this.Badge,
      BadgeNo: this.BadgeNo,
      BadgeExpDate: this.BadgeExpDate,
      DriverInductionDate: this.DriverInductionDate,
      BloodGroup: this.BloodGroup,
      DriverType: this.DriveType,
      MedicalFitnessDone: this.MedicalFitnessDone,
      MedicalFitnessDate: this.MedicalFitnessDate,
      MedicalFitnessExpiryDate: this.MedicalFitnessExpiryDate,
      PoliceVerificationDone: this.PoliceVerificationDone,
      PolicaVerificationDate: this.PoliceVerificationDate,
      PoliceVerificationExpiryDate: this.PoliceVerificationExpiryDate,
      InternalVerification: this.InternalVerification,
      GovermentIdProof: this.GovermentIDProof,
      Locality: this.Locality,
      VaccinationStatus: this.VaccinationStatus,
      FleetID: this.FleetID,
      DrivingLicense: this.DrivingLicense,
      MedicalCertificate: this.MedicalCertificate,
      AadharCard: this.AadharCard,
      NdcForm: this.NdcForm,
      DriverPhoto: this.DriverPhoto,
    };
    this.TMS.UpdateDriver(eb).subscribe({
      next: (data) => {
        debugger;

        this.loader = false;
        Swal.fire('Driver Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10;
        this.dialogRef.close(false);
        this.router.navigate(['/admin/Driverlist']);
        this.loader = false;
      },
    });
  }

  public cancel() {
    debugger;
    this.loader = false;
    this.dialogRef.close(false);
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = emailPattern.test(this.emailID);
  }

  // public getCountry() {
  //   this.TMS.GetCountry().subscribe((res) => {
  //     debugger;
  //     this.countryList = res;
  //     this.loader = false;
  //   });
  // }
  // public getState() {
  //   this.TMS.GetState().subscribe((res) => {
  //     debugger;
  //     this.stateList = res;
  //     this.loader = false;
  //   });
  // }
  // public getCity() {
  //   this.TMS.GetCity().subscribe((res) => {
  //     debugger;
  //     this.cityList = res;
  //     this.loader = false;
  //   });
  // }

  // getpassword() {
  //   this.password = `${this.first || ''}${this.second || ''}${this.third || ''}${this.fourth || ''}`;
  //   console.log(this.password);

  // }
  // getconfirmpassword() {
  //   debugger;
  //   this.password = this.first + this.second + this.third + this.fourth;
  //   this.confirmPassword =
  //     this.first1 + this.second1 + this.third1 + this.fourth1;
  //   if (this.password != this.confirmPassword) {
  //     Swal.fire('Please enter valid Password');
  //     this.first1 = '';
  //     this.second1 = '';
  //     this.third1 = '';
  //     this.fourth1 = '';
  //   }
  // }
  // public insertCustomer() {
  //   this.loader = true;
  //   this.showPopup = 0;
  //   debugger;
  //   if (this.phoneNo.length == 10 && this.password == this.confirmPassword) {
  //     if (
  //       this.firstName == '' ||
  //       this.firstName == undefined ||
  //       this.lastName == '' ||
  //       this.lastName == undefined ||
  //       this.phoneNo == '' ||
  //       this.phoneNo == undefined ||
  //       this.emailID == '' ||
  //       this.emailID == undefined ||
  //       this.country == '' ||
  //       this.country == undefined ||
  //       this.state == '' ||
  //       this.state == undefined ||
  //       this.city == '' ||
  //       this.city == undefined
  //     ) {
  //       this.loader = false;
  //       this.showPopup = 1;
  //       this.messageId = 13;
  //     } else {
  //       var data = {
  //         FirstName: this.firstName,
  //         LastName: this.lastName,
  //         PhoneNo: this.phoneNo,
  //         EmailID: this.emailID,
  //         Country: this.country,
  //         State: this.state,
  //         City: this.city,
  //         Password: this.password,
  //         ConfirmPassword: this.confirmPassword,
  //       };
  //       this.TMS.InsertCustomer(data).subscribe({
  //         next: (data) => {
  //           debugger;
  //           // this.router.navigate(['/Employee/Customer']);
  //           this.dialogRef.close(false);
  //           this.loader = false;
  //           Swal.fire('Registration Completed Successfully');
  //           this.showPopup = 1;
  //           this.messageId = 8;
  //         },
  //       });
  //     }
  //   } else {
  //     Swal.fire('Please enter valid details');
  //     this.phoneNo = '';
  //     this.confirmPassword = '';
  //   }
  // }

  // public UpdateCustomer() {
  //   debugger;
  //   this.showPopup = 0;
  //   this.loader = true;
  //   var eb = {
  //     ID: this.ID,
  //     FirstName: this.firstName,
  //     LastName: this.lastName,
  //     PhoneNo: this.phoneNo,
  //     EmailID: this.emailID,
  //     Country: this.country,
  //     State: this.state,
  //     City: this.city,
  //     Password: this.password,
  //     ConfirmPassword: this.confirmPassword,
  //   };
  //   this.TMS.UpdateCustomer(eb).subscribe({
  //     next: (data) => {
  //       debugger;
  //       this.loader = false;
  //       Swal.fire('Customer Updated Successfully');
  //       this.showPopup = 1;
  //       this.messageId = 10;
  //       this.dialogRef.close(false);
  //       this.router.navigate(['/Employee/Customer']);
  //       this.loader = false;
  //     },
  //   });
  // }

  // validatePassword(): boolean {
  //   return this.password.length >= 4;
  // }

  // passwordsMatch(): boolean {
  //   return this.password === this.confirmPassword;
  // }
}
