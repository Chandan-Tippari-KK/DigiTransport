import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StaffFormComponent } from '../staff-form/staff-form.component';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-staff-dash',
  templateUrl: './staff-dash.component.html',
  styleUrls: ['./staff-dash.component.css'],
})
export class StaffDashComponent implements OnInit {
  staffData: any;
  loader: any;
  search: any;
  showPopup: any;
  messageId: any;
  JobGrade: any;
  JobTitle: any;
  page: any = 1;
  EmployeeData: any;
  ClientID: any;
  CompanyData: any;

  constructor(public TMS: TMS, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.getEmployeeData();
    this.getClient();
    this.ClientID = 0;
    this.loader = false;
    //this.getStaff();
  }
  async getClient() {
    this.TMS.GetCompany().subscribe((res) => {
      debugger;
      this.CompanyData = res;
    });
  }
  async getEmployeeData() {
    this.TMS.GetEmployee().subscribe((res) => {
      debugger;
      this.EmployeeData = res;
    });
  }

  // public getStaff() {
  //   this.TMS.GetStaff().subscribe((res) => {
  //     debugger;
  //     this.staffData = res;
  //     this.loader = false;
  //   });
  //   this.TMS.GetJobGrade().subscribe((res) => {
  //     debugger;
  //     this.JobGrade = res;
  //     console.log(this.JobGrade);
  //   });
  //   this.TMS.GetJobTitle().subscribe((res) => {
  //     debugger;
  //     this.JobTitle = res;
  //     console.log(this.JobTitle);
  //   });
  // }
  showDialog() {
    debugger;
    let ID = undefined;
    this.matDialog
      .open(StaffFormComponent, {
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
  edit(ID: any) {
    debugger;
    this.matDialog
      .open(StaffFormComponent, {
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
  public openDeletePopUp(id: any) {
    debugger;
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete record',
      text: 'Are you sure you want to delete it?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed',
    }).then((result) => {
      if (result.value == true) {
        this.TMS.DeleteEmployee(id).subscribe({
          next: (data) => {
            Swal.fire('Deleted Successfully');
            this.ngOnInit();
          },
        });
      }
    });
  }

  exceldata: any;
  arrayBuffer: any;
  filetype: any;
  file: any;

  incomingfile(event: any) {
    debugger;
    this.showPopup = 0;
    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);
    debugger;
    if (characters == '.xlsx' || characters == '.XLSX') {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        debugger;
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join('');
        var workbook = XLSX.read(bstr, { type: 'binary' });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.exceldata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file);
    } else {
      /* Swal.fire("Imported file format not supported."); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 68;
    }
  }

  i: any;
  jobgradeid: any;
  jobtitleid: any;
  public async Upload_file() {
    debugger;
    this.showPopup = 0;
    if (this.exceldata == undefined) {
      /*  Swal.fire('Choose a File'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 209;
    } else {
      let apiarray = [];
      for (this.i = 0; this.i < this.exceldata.length; this.i++) {
        var jobgrade = this.JobGrade.filter(
          (x: { short: any }) =>
            x.short === this.exceldata[this.i].jobGradeID + '  '
        );

        if (jobgrade.length != 0) {
          this.jobgradeid = jobgrade[0].id + '  ';
        } else {
          this.jobgradeid = 0;
        }

        var jobtitle = this.JobTitle.filter(
          (x: { short: any }) => x.short === this.exceldata[this.i].jobTitleID
        );

        if (jobtitle.length != 0) {
          this.jobtitleid = jobtitle[0].id;
        } else {
          this.jobtitleid = 0;
        }

        var data = {
          EmployeeCode: this.exceldata[this.i].employeeCode,
          FirstName: this.exceldata[this.i].firstName,
          LastName: this.exceldata[this.i].lastName,
          PhoneNo: this.exceldata[this.i].phoneNo,
          EmailID: this.exceldata[this.i].lastName + '@gmail.com',
          DateEngaged: '1990-01-01 00:00:00.000',
          // 'EmployeeStatus': this.employeeStatus,
          Gender: this.exceldata[this.i].gender,
          DepartmentID: this.exceldata[this.i].departmentID,
          RoleID: this.exceldata[this.i].roleID,
          IDNumber: this.exceldata[this.i].iDNumber,
          EntityCode: this.exceldata[this.i].entityCode,
          Company: this.exceldata[this.i].company,
          RacialGroup: this.exceldata[this.i].racialGroup,
          UIFStatus: this.exceldata[this.i].uIFStatus,
          NatureOfContract: this.exceldata[this.i].natureOfContract,
          JobGradeID: this.jobgradeid,
          JobTitleID: this.jobtitleid,
        };

        debugger;
        this.TMS.InsertStaff(data).subscribe(
          async (data) => {
            debugger;

            if (data == 0) {
              Swal.fire(
                'Error in Uploading Data. Incorrect Data or your  License Count is over. '
              );
              var obj = {
                PageName: 'Staff Upload',
                ErrorMessage:
                  'EmailID or Mobile Number Already Exists or License Count is Over.',
                Name: this.exceldata[this.i - 1].FIRSTNAME,
                EmployeeID: this.exceldata[this.i - 1].EMPLID,
                EmployeeCount: 1,
                UserID: this.exceldata[this.i - 1].EMPLID,
                LoginType: 'HR',
                API: 'BULK Upload',
              };
            } else {
              Swal.fire('Saved Successfully');
            }
          },
          (error) => {}
        );
      }
    }
  }
}
