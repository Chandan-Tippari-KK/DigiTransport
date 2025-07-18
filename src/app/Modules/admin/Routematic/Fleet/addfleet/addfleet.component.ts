import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addfleet',
  templateUrl: './addfleet.component.html',
  styleUrls: ['./addfleet.component.css'],
})
export class AddfleetComponent implements OnInit {
  loader: any;
  vehicleRegNo: any;
  routeNo: any;
  vehicleType: any;
  billingTag: any;
  trackeeID: any;
  showPopup: any;
  messageId: any;
  Vehicle_Reg_No: any;
  Route_No: any;
  fleetList: any;
  emailID: any;
  trackeeName: any;
  vehicleStatus: any;
  vehicleInduction: any;
  vehicleNo: any;
  registrationExpDate: any;
  firstAidKitDate: any;
  fireExtinguisherDate: any;
  driverName: any;
  make: any;
  model: any;
  basic: any;
  chassisNo: any;
  permitExpDate: any;
  insuranceExpDate: any;
  fitnessExpDate: any;
  roadTaxValidityExp: any;
  pucExpDate: any;
  kmsRunBeforeOnboarding: any;
  insuranceAgencyName: any;
  ownerName: any;
  ccPermitDate: any;
  owner: any;
  ownerAddress: any;
  validTokenTaxDate: any;
  passengerTaxDate: any;
  gpsInstalled: any;
  gpsInstalltionDate: any;
  cngFitted: any;
  cngFittedEndorsedinRc: any;
  mandatorySignature: any;
  engineCapacity: any;
  fuelType: any;
  standard: any;
  airConditioned: any;
  rcBook: any;
  insuranceBook: any;
  permitBook: any;
  vehicleInductionForm: any;
  fitnessCertificateForm: any;
  fleetPhoto: any;
  officeLocation: any;
  registrationDate: any;
  public attachmentsrcBook: any = [];
  public attachmentsinsuranceBook: any = [];
  public attachmentspermitBook: any = [];
  public attachmentsvehicleBook: any = [];
  public attachmentsfitnessCertificateForm: any = [];
  public attachmentfleetPhoto: any = [];
  attachmentPath: any;
  public attachmentsurl: any = [];
  public attachmentsurlIbook: any = [];
  public attachmentsurlFLP: any = [];
  public attachmentsurlPbook: any = [];
  public attachmentsurlCbook: any = [];
  public attachmentsurlVbook: any = [];
  RouteNoData: any;
  RouteData: any[];
  constructor(
    public TMS: TMS,
    public router: Router,
    public dialogRef: MatDialogRef<AddfleetComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getRouteNumberData();
    this.getRouteData();
  }

  async getRouteNumberData() {
    this.TMS.GetRouteNumber().subscribe((res) => {
      debugger;
      this.RouteNoData = res;
    });
  }

  public getData() {
    debugger;
    this.TMS.GetFleetByID(this.ID).subscribe({
      next: (data) => {
        debugger;
        this.fleetList = data;
        this.loader = false;
        this.vehicleRegNo = this.fleetList[0].vehicleRegNo;
        this.routeNo = this.fleetList[0].routeNo;
        this.vehicleType = this.fleetList[0].vehicleType;
        this.billingTag = this.fleetList[0].billingTag;
        this.trackeeID = this.fleetList[0].trackeeID;
        this.trackeeName = this.fleetList[0].trackeeName;
        this.vehicleStatus = this.fleetList[0].vehicleStatus;
        this.officeLocation = this.fleetList[0].officeLocation;
        this.registrationDate = this.fleetList[0].registrationDate;
        this.vehicleInduction = this.fleetList[0].vehicleInduction;
        this.vehicleNo = this.fleetList[0].vehicleNo;
        this.registrationExpDate = this.fleetList[0].registrationExpDate;
        this.firstAidKitDate = this.fleetList[0].firstAidKitDate;
        this.fireExtinguisherDate = this.fleetList[0].fireExtinguisherDate;
        this.driverName = this.fleetList[0].driverName;
        this.make = this.fleetList[0].make;
        this.model = this.fleetList[0].model;
        this.basic = this.fleetList[0].basic;
        this.chassisNo = this.fleetList[0].chassisNo;
        this.permitExpDate = this.fleetList[0].permitExpDate;
        this.insuranceExpDate = this.fleetList[0].insuranceExpDate;
        this.fitnessExpDate = this.fleetList[0].fitnessExpDate;
        this.roadTaxValidityExp = this.fleetList[0].roadTaxValidityExp;
        this.pucExpDate = this.fleetList[0].pucExpDate;
        this.kmsRunBeforeOnboarding = this.fleetList[0].kmsRunBeforeOnboarding;
        this.insuranceAgencyName = this.fleetList[0].insuranceAgencyName;
        this.ownerName = this.fleetList[0].ownerName;
        this.ccPermitDate = this.fleetList[0].ccPermitDate;
        this.ownerAddress = this.fleetList[0].ownerAddress;
        this.owner = this.fleetList[0].owner;
        this.validTokenTaxDate = this.fleetList[0].validTokenTaxDate;
        this.passengerTaxDate = this.fleetList[0].passengerTaxDate;
        this.gpsInstalled = this.fleetList[0].gpsInstalled;
        this.gpsInstalltionDate = this.fleetList[0].gpsInstalltionDate;
        this.cngFitted = this.fleetList[0].cngFitted;
        this.cngFittedEndorsedinRc = this.fleetList[0].cngFittedEndorsedinRc;
        this.mandatorySignature = this.fleetList[0].mandatorySignature;
        this.engineCapacity = this.fleetList[0].engineCapacity;
        this.fuelType = this.fleetList[0].fuelType;
        this.standard = this.fleetList[0].standard;
        this.airConditioned = this.fleetList[0].airConditioned;
        this.rcBook = this.fleetList[0].rcBook;
        this.insuranceBook = this.fleetList[0].insuranceBook;
        this.permitBook = this.fleetList[0].permitBook;
        this.vehicleInductionForm = this.fleetList[0].vehicleInductionForm;
        this.fitnessCertificateForm = this.fleetList[0].fitnessCertificateForm;
        this.fleetPhoto = this.fleetList[0].fleetPhoto;
      },
    });
  }

  public insertFleet() {
    this.loader = true;
    this.showPopup = 0;
    debugger;
    if (
      this.vehicleRegNo == '' ||
      this.vehicleRegNo == undefined ||
      this.routeNo == '' ||
      this.routeNo == undefined ||
      this.vehicleType == '' ||
      this.vehicleType == undefined ||
      this.billingTag == '' ||
      this.billingTag == undefined ||
      this.trackeeID == '' ||
      this.trackeeName == '' ||
      this.trackeeName == undefined
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var data = {
        VehicleRegNo: this.vehicleRegNo,
        RouteNo: this.routeNo,
        VehicleType: this.vehicleType,
        BillingTag: this.billingTag,
        TrackeeID: this.trackeeID,
        TrackeeName: this.trackeeName,
        VehicleStatus: this.vehicleStatus,
        OfficeLocation: this.officeLocation,
        RegistrationDate: this.registrationDate,
        VehicleInduction: this.vehicleInduction,
        VehicleNo: this.vehicleNo,
        RegistrationExpDate: this.registrationExpDate,
        FirstAidKitDate: this.firstAidKitDate,
        FireExtinguisherDate: this.fireExtinguisherDate,
        DriverName: this.driverName,
        Make: this.make,
        Model: this.model,
        Basic: this.basic,
        ChassisNo: this.chassisNo,
        PermitExpDate: this.permitExpDate,
        InsuranceExpDate: this.insuranceExpDate,
        FitnessExpDate: this.fitnessExpDate,
        RoadTaxValidityExp: this.roadTaxValidityExp,
        PucExpDate: this.pucExpDate,
        KmsRunBeforeOnboarding: this.kmsRunBeforeOnboarding,
        InsuranceAgencyName: this.insuranceAgencyName,
        OwnerName: this.ownerName,
        CcPermitDate: this.ccPermitDate,
        OwnerAddress: this.ownerAddress,
        Owner: this.owner,
        ValidTokenTaxDate: this.validTokenTaxDate,
        PassengerTaxDate: this.passengerTaxDate,
        GpsInstalled: this.gpsInstalled,
        GpsInstalltionDate: this.gpsInstalltionDate,
        CngFitted: this.cngFitted,
        CngFittedEndorsedinRc: this.cngFittedEndorsedinRc,
        MandatorySignature: this.mandatorySignature,
        EngineCapacity: this.engineCapacity,
        FuelType: this.fuelType,
        Standard: this.standard,
        AirConditioned: this.airConditioned,
        RcBook: this.rcBook,
        InsuranceBook: this.insuranceBook,
        PermitBook: this.permitBook,
        VehicleInductionForm: this.vehicleInductionForm,
        FitnessCertificateForm: this.fitnessCertificateForm,
        'FleetPhoto ': this.fleetPhoto,
      };
      this.TMS.InsertFleet(data).subscribe({
        next: (data) => {
          debugger;
          this.router.navigate(['/admin/Fleetlist']);
          this.dialogRef.close(false);
          this.loader = false;
          Swal.fire('Registration Completed Successfully');
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

  public update() {
    // this.uploadocx();
    this.Updatefleet();
  }
  public submit() {
    this.showPopup = 0;
    debugger;
    this.loader = true;
    if (
      this.vehicleRegNo == '' ||
      this.vehicleRegNo == undefined ||
      this.routeNo == '' ||
      this.routeNo == undefined ||
      this.vehicleType == '' ||
      this.vehicleType == undefined ||
      this.billingTag == '' ||
      this.billingTag == undefined ||
      this.trackeeID == '' ||
      this.trackeeName == '' ||
      this.trackeeName == undefined
    ) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      // this.uploadocx();
      this.insertFleet();
    }
  }

  uploadocx() {
    this.TMS.ProjectAttachments(this.attachmentsrcBook).subscribe({
      next: (data) => {
        debugger;
        this.attachmentsurl.push(data);
        // this.attachments.length = 0;

        this.loader = false;
      },
    });
    this.TMS.ProjectAttachments(this.attachmentsinsuranceBook).subscribe({
      next: (data) => {
        debugger;
        this.attachmentsurlIbook.push(data);
        // this.attachments.length = 0;

        this.loader = false;
      },
    });
    this.TMS.ProjectAttachments(this.attachmentspermitBook).subscribe({
      next: (data) => {
        debugger;
        this.attachmentsurlPbook.push(data);
        // this.attachments.length = 0;

        this.loader = false;
      },
    });
    this.TMS.ProjectAttachments(this.attachmentsvehicleBook).subscribe({
      next: (data) => {
        debugger;
        this.attachmentsurlVbook.push(data);
        // this.attachments.length = 0;

        this.loader = false;
      },
    });
    this.TMS.ProjectAttachments(
      this.attachmentsfitnessCertificateForm
    ).subscribe({
      next: (data) => {
        debugger;
        this.attachmentsurlCbook.push(data);
        // this.attachments.length = 0;

        this.loader = false;
      },
    });
    this.TMS.ProjectAttachments(this.attachmentfleetPhoto).subscribe({
      next: (data) => {
        debugger;
        this.attachmentsurlFLP.push(data);
        // this.attachments.length = 0;
       
        this.loader = false;
      },
    });
  }
  async getRouteData() {
    this.TMS.GetRouteNumber().subscribe((res) => {
      debugger;
      this.RouteData = res;
    });
  }
  public Updatefleet() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      ID: this.ID,
      VehicleRegNo: this.vehicleRegNo,
      RouteNo: this.routeNo,
      VehicleType: this.vehicleType,
      BillingTag: this.billingTag,
      TrackeeID: this.trackeeID,
      TrackeeName: this.trackeeName,
      VehicleStatus: this.vehicleStatus,
      OfficeLocation: this.officeLocation,
      RegistrationDate: this.registrationDate,
      VehicleInduction: this.vehicleInduction,
      VehicleNo: this.vehicleNo,
      RegistrationExpDate: this.registrationExpDate,
      FirstAidKitDate: this.firstAidKitDate,
      FireExtinguisherDate: this.fireExtinguisherDate,
      DriverName: this.driverName,
      Make: this.make,
      Model: this.model,
      Basic: this.basic,
      ChassisNo: this.chassisNo,
      PermitExpDate: this.permitExpDate,
      InsuranceExpDate: this.insuranceExpDate,
      FitnessExpDate: this.fitnessExpDate,
      RoadTaxValidityExp: this.roadTaxValidityExp,
      PucExpDate: this.pucExpDate,
      KmsRunBeforeOnboarding: this.kmsRunBeforeOnboarding,
      InsuranceAgencyName: this.insuranceAgencyName,
      OwnerName: this.ownerName,
      CcPermitDate: this.ccPermitDate,
      OwnerAddress: this.ownerAddress,
      Owner: this.owner,
      ValidTokenTaxDate: this.validTokenTaxDate,
      PassengerTaxDate: this.passengerTaxDate,
      GpsInstalled: this.gpsInstalled,
      GpsInstalltionDate: this.gpsInstalltionDate,
      CngFitted: this.cngFitted,
      CngFittedEndorsedinRc: this.cngFittedEndorsedinRc,
      MandatorySignature: this.mandatorySignature,
      EngineCapacity: this.engineCapacity,
      FuelType: this.fuelType,
      Standard: this.standard,
      AirConditioned: this.airConditioned,
      RcBook: this.attachmentsurl[0],
      InsuranceBook: this.attachmentsurlIbook[0],
      PermitBook: this.attachmentsurlPbook[0],
      VehicleInductionForm: this.attachmentsurlVbook[0],
      FitnessCertificateForm: this.attachmentsurlCbook[0],
      'FleetPhoto ': this.attachmentsurlFLP[0],
    };
    this.TMS.UpdateFleet(eb).subscribe({
      next: (data) => {
        debugger;
        this.loader = false;
        Swal.fire('Customer Updated Successfully');
        this.showPopup = 1;
        this.messageId = 10;
        this.dialogRef.close(false);
        this.router.navigate(['/admin/Fleetlist']);
        this.loader = false;
      },
    });
  }
  onRemovercBook(event: any) {
    this.attachmentsrcBook.splice(this.rcBook.indexOf(event), 1);
  }

  onSelectrcBook(event: any) {
    debugger;
    this.showPopup = 0;
    this.attachmentsrcBook.length = 0;
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
              this.attachmentsrcBook.length = 0;
            } else {
              this.attachmentsrcBook.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          };
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      }
    }
  }

  onRemoveinsuranceBook(event: any) {
    this.attachmentsinsuranceBook.splice(this.rcBook.indexOf(event), 1);
  }

  onSelectinsuranceBook(event: any) {
    debugger;
    this.showPopup = 0;
    this.attachmentsinsuranceBook.length = 0;
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
              this.attachmentsinsuranceBook.length = 0;
            } else {
              this.attachmentsinsuranceBook.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          };
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      }
    }
  }
  onRemovepermitBook(event: any) {
    this.attachmentspermitBook.splice(this.rcBook.indexOf(event), 1);
  }

  onSelectpermitBook(event: any) {
    debugger;
    this.showPopup = 0;
    this.attachmentspermitBook.length = 0;
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
              this.attachmentspermitBook.length = 0;
            } else {
              this.attachmentspermitBook.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          };
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      }
    }
  }
  onRemovevehicleBook(event: any) {
    this.attachmentsvehicleBook.splice(this.rcBook.indexOf(event), 1);
  }

  onSelectvehicleBook(event: any) {
    debugger;
    this.showPopup = 0;
    this.attachmentsvehicleBook.length = 0;
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
              this.attachmentsvehicleBook.length = 0;
            } else {
              this.attachmentsvehicleBook.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          };
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      }
    }
  }
  onRemovefleetPhoto(event: any) {
    this.attachmentfleetPhoto.splice(this.rcBook.indexOf(event), 1);
  }

  onSelectfleetPhoto(event: any) {
    debugger;
    this.showPopup = 0;
    this.attachmentfleetPhoto.length = 0;
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
              this.attachmentfleetPhoto.length = 0;
            } else {
              this.attachmentfleetPhoto.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          };
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      }
    }
  }
  onRemoveFCform(event: any) {
    this.attachmentsfitnessCertificateForm.splice(
      this.rcBook.indexOf(event),
      1
    );
  }

  onSelectFCform(event: any) {
    debugger;
    this.showPopup = 0;
    this.attachmentsfitnessCertificateForm.length = 0;
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
              this.attachmentsfitnessCertificateForm.length = 0;
            } else {
              this.attachmentsfitnessCertificateForm.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          };
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      }
    }
  }
}
