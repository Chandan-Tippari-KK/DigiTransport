import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() data11 = new EventEmitter();
  @Input() item: any;
  mini: any;
  companyid: any;
  sidenav: any;
  active: any;
  login: any;
  UserName: any;
  company_name: any;
  role: any;
  temp: any;
  show: any;
  temp1: any;
  home: any;
  roleid: any;
  StaffID: any;
  otEligibility: any;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.login = sessionStorage.getItem('roledid');
    this.temp1 = sessionStorage.getItem('temp');
    this.active = 0;
    this.companyid = sessionStorage.getItem('companyid');
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    this.roleid = sessionStorage.getItem('roledid');
    this.StaffID = localStorage.getItem('staffid');
    this.otEligibility = localStorage.getItem('OTEligibility');
  }
  public getvalues(val: any) {
    this.mini = val;
  }
  public dashboard() {
    this.active = 1;
    this.router.navigate(['/Employee/Dashboard']);
    localStorage.setItem('Pagename', 'Dashboard');
    this.data11.emit('Dashboard');
    if (this.roleid == 6) {
      this.router.navigate(['/Employee/Dashboard']);
      localStorage.setItem('Pagename', 'Dashboard');
      this.data11.emit('Dashboard');
    } else if (this.roleid == 2) {
      this.router.navigate(['/Manager/ManagerDashboard']);
      localStorage.setItem('Pagename', 'Dashboard');
      this.data11.emit('Dashboard');
    } else {
      this.router.navigate(['/HR/hrdashboard']);
      localStorage.setItem('Pagename', 'Dashboard');
      this.data11.emit('Dashboard');
    }
  }
  public Drivers() {
    this.active = 16;
    this.router.navigate(['/admin/Driverlist']);
    localStorage.setItem('Pagename', 'Customer');
    this.data11.emit('Customer');
  }
  public Employee() {
    this.active = 17;
    this.router.navigate(['/Employee/StaffDash']);
    localStorage.setItem('Pagename', 'Employee');
    this.data11.emit('Employee');
  }
  public EmployeeRoaster() {
    this.active = 101;
    this.router.navigate(['/admin/employeeroaster']);
    localStorage.setItem('Pagename', 'Employee');
    this.data11.emit('Employee');
  }
  public fleetmappingdash() {
    this.active = 102;
    this.router.navigate(['/admin/tripdetails']);
    localStorage.setItem('Pagename', 'Employee');
    this.data11.emit('Employee');
  }

  public tripdetails() {
    this.active = 103;
    this.router.navigate(['/admin/tripdetails']);
    localStorage.setItem('Pagename', 'Employee');
    this.data11.emit('Employee');
  }

  public Company() {
    this.active = 177;
    this.router.navigate(['/admin/Companydash']);
    localStorage.setItem('Pagename', 'Employee');
    this.data11.emit('Employee');
  }
  public Guard() {
    this.active = 179;
    this.router.navigate(['/Employee/GuardDashboard']);
    localStorage.setItem('Pagename', 'Employee');
    this.data11.emit('Employee');
  }
  public ClientOffice() {
    this.active = 178;
    this.router.navigate(['/Employee/Clientoffices']);
    localStorage.setItem('Pagename', 'Employee');
    this.data11.emit('Employee');
  }

  public Dashboard() {
    this.active = 1;
    this.router.navigate(['/Employee/Dashboard']);
    localStorage.setItem('Pagename', 'Dashboard');
    this.data11.emit('Dashboard');
  }
  public Fleet() {
    this.active = 15;
    this.router.navigate(['/admin/Fleetlist']);
    localStorage.setItem('Pagename', 'Fleet');
    this.data11.emit('Fleet');
  }

  public licenceDetails() {
    this.active = 16;
    this.router.navigate(['/HR/LicenceDetails']);
    localStorage.setItem('Pagename', 'LICENCE DETAILS');
    this.data11.emit('LICENCE DETAILS');
  }
  public inactiveStaffDetails() {
    this.active = 17;
    this.router.navigate(['/HR/InactiveStaffDetails']);
    localStorage.setItem('Pagename', 'Inactive Staff Details');
    this.data11.emit('Inactive Staff Details');
  }
  public PayrollTrigger() {
    this.active = 18;
    this.router.navigate(['/HR/PayrollTriggerDash']);
    localStorage.setItem('Pagename', 'Payroll Trigger');
    this.data11.emit('Payroll Trigger');
  }

  public PRELIMINARYREPORT() {
    this.active = 19.1;
    this.router.navigate(['/HR/GeneratePreliminaryReport']);
    localStorage.setItem('Pagename', 'Preliminary Report');
    this.data11.emit('Preliminary Report');
  }

  public PAYROLLREPORT() {
    this.active = 19.2;
    this.router.navigate(['/HR/GenerateCsvfiles']);
    localStorage.setItem('Pagename', 'Payroll Report');
    this.data11.emit('Payroll Report');
  }

  public leaveConfiguration() {
    this.active = 20.1;
    this.router.navigate(['/HR/LeaveConfigurationDash']);
    localStorage.setItem('Pagename', 'Leave Configuration');
    this.data11.emit('Leave Configuration');
  }

  public loanConfiguration() {
    this.active = 20.2;
    this.router.navigate(['/HR/LoanConfigurationDash']);
    localStorage.setItem('Pagename', 'Loan Configuration');
    this.data11.emit('Loan Configuration');
  }

  public bulkUploadMissingStaff() {
    this.active = 20.3;
    this.router.navigate(['/HR/StaffBulkUploadExceptions']);
    localStorage.setItem('Pagename', 'Bulk Upload Missing Staff');
    this.data11.emit('Bulk Upload Missing Staff');
  }

  public UploadAttendance() {
    this.active = 20.4;
    this.router.navigate(['/HR/LoadAttendance']);
    localStorage.setItem('Pagename', 'Upload Attendance');
    this.data11.emit('Upload Attendance');
  }

  public leaveUpload() {
    this.active = 20.5;
    this.router.navigate(['/HR/LeaveUpload']);
    localStorage.setItem('Pagename', 'Leave Upload');
    this.data11.emit('Leave Upload');
  }

  public newTicketsDetails() {
    this.active = 2.1;
    this.router.navigate(['/Employee/NewTickets']);
    localStorage.setItem('Pagename', 'New Tickets');
    this.data11.emit('New Tickets');
  }

  public acceptedTicketsDetails() {
    this.active = 2.2;
    this.router.navigate(['/Employee/AcceptedTickets']);
    localStorage.setItem('Pagename', 'Accepted Tickets');
    this.data11.emit('Accepted Tickets');
  }
  public rejectedTicketsDetails() {
    this.active = 2.4;
    this.router.navigate(['/Employee/RejectedTickets']);
    localStorage.setItem('Pagename', 'Rejected Tickets');
    this.data11.emit('Rejected Tickets');
  }
  public closedTicketsDetails() {
    this.active = 2.3;
    this.router.navigate(['/Employee/ClosedTickets']);
    localStorage.setItem('Pagename', 'Closed Tickets');
    this.data11.emit('Closed Tickets');
  }

  public attendanceCorrection() {
    this.active = 2.4;
    this.router.navigate(['/Employee/AttendanceCorrectionDash']);
    localStorage.setItem('Pagename', 'Attendance Correction');
    this.data11.emit('Attendance Correction');
  }

  public leaveRequest() {
    this.active = 3.1;
    if (this.roleid == 11) {
      this.router.navigate(['/HR/HRLeaveRequestDash']);
      localStorage.setItem('Pagename', 'Leave Request');
      this.data11.emit('Leave Request');
    } else {
      this.router.navigate(['/Employee/LeaveRequestDash']);
      localStorage.setItem('Pagename', 'Leave Request');
      this.data11.emit('Leave Request');
    }
  }

  public timeSheetRequest() {
    this.active = 3.2;
    this.router.navigate(['/Employee/TimesheetRequestDash']);
    localStorage.setItem('Pagename', 'Building');
    this.data11.emit('Timesheet');
  }

  public locatorRequest() {
    this.active = 3.3;
    this.router.navigate(['/Employee/LocatorRequestDash']);
    localStorage.setItem('Pagename', 'Locator Request');
    this.data11.emit('Locator Request');
  }

  public loanRequest() {
    this.active = 3.4;
    this.router.navigate(['/Employee/LoanRequestDash']);
    localStorage.setItem('Pagename', 'Loan Request');
    this.data11.emit('Loan Request');
  }

  public employeeResignation() {
    this.active = 3.5;
    this.router.navigate(['/Employee/EmployeeResignationDash']);
    localStorage.setItem('Pagename', 'Employee Resignation');
    this.data11.emit('Employee Resignation');
  }

  public policies() {
    this.active = 4;
    this.router.navigate(['/Employee/PoliciesDash']);
    localStorage.setItem('Pagename', 'Policies');
    this.data11.emit('Policies');
  }

  public holidays() {
    this.active = 5;
    this.router.navigate(['/Employee/HolidaysDash']);
    localStorage.setItem('Pagename', 'Holidays');
    this.data11.emit('Holidays');
  }

  public announcements() {
    this.active = 6;
    this.router.navigate(['/Employee/AnnouncementsDash']);
    localStorage.setItem('Pagename', 'Announcements');
    this.data11.emit('Announcements');
  }
  public LeaveType() {
    this.active = 10.11;
    this.router.navigate(['/HR/LeaveTypeDashboard']);
    localStorage.setItem('Pagename', 'Leave Type');
    this.data11.emit('Leave Type');
  }

  public LoanType() {
    this.active = 10.2;
    this.router.navigate(['/HR/LoanMasterDash']);
    localStorage.setItem('Pagename', 'Loan Type');
    this.data11.emit('Loan Type');
  }
  public ShiftMaster() {
    this.active = 10.3;
    this.router.navigate(['/HR/ShiftMasterDash']);
    localStorage.setItem('Pagename', 'Shift Master');
    this.data11.emit('Shift Master');
  }
  public CountryMaster() {
    this.active = 10.4;
    this.router.navigate(['/HR/CountryMasterDash']);
    localStorage.setItem('Pagename', 'Country Master');
    this.data11.emit('Country Master');
  }
  public ProvinceMaster() {
    this.active = 10.5;
    this.router.navigate(['/HR/StateMasterDash']);
    localStorage.setItem('Pagename', 'Province Master');
    this.data11.emit('Province Master');
  }

  public CityMaster() {
    this.active = 10.6;
    this.router.navigate(['/HR/CityMasterDash']);
    localStorage.setItem('Pagename', 'City Master');
    this.data11.emit('City Master');
  }
  public BarangayMaster() {
    this.active = 10.7;
    this.router.navigate(['/HR/Barangaymaster']);
    localStorage.setItem('Pagename', 'Barangay Master');
    this.data11.emit('Barangay Master');
  }

  public DepartmentMaster() {
    this.active = 10.8;
    this.router.navigate(['/HR/Departmentmasterdash']);
    localStorage.setItem('Pagename', 'Department Master');
    this.data11.emit('Department Master');
  }

  public OTMaster() {
    this.active = 10.9;
    this.router.navigate(['/HR/Otratesdash']);
    localStorage.setItem('Pagename', 'OT Master');
    this.data11.emit('Ot Master');
  }
  public PositionMaster() {
    this.active = 10.1;
    this.router.navigate(['/HR/RoleMasterDash']);
    localStorage.setItem('Pagename', 'Position Master');
    this.data11.emit('Ot Master');
  }
  public RouteMaster() {
    this.active = 10.12;
    this.router.navigate(['/admin/RouteMasterDashboard']);
    localStorage.setItem('Pagename', 'Route Master');
    this.data11.emit('Route Master');
  }
  public MyProfile() {
    this.active = 2024;
    this.router.navigate([
      '/admin/MyProfile/',
      sessionStorage.getItem('empid'),
    ]);
    localStorage.setItem('Pagename', 'My Profile');
    this.data11.emit('My Profile');
    this.router.navigate([
      '/admin/MyProfile/',
      sessionStorage.getItem('empid'),
    ]);
    localStorage.setItem('Pagename', 'MyProfile');
    this.data11.emit('MyProfile');
  }

  public AreaMaster() {
    this.active = 10.13;
    this.router.navigate(['/admin/AreaMasterDashboard']);
    localStorage.setItem('Pagename', 'Area Master');
    this.data11.emit('Area Master');
  }

  public ClientLogin() {
    this.active = 1014;
    this.router.navigate(['/admin/ClientLogin']);
    localStorage.setItem('Pagename', 'ClientLogin');
    this.data11.emit('ClientLogin');
  }
  public AssignedTrips() {
    this.active = 10.14;
    this.router.navigate(['/admin/assignedtrip']);
    localStorage.setItem('Pagename', 'Assigned Trips');
    this.data11.emit('Assigned Trips');
  }

  public ApprovedTrips() {
    this.active = 10.15;
    this.router.navigate(['/admin/approvedtrip']);
    localStorage.setItem('Pagename', 'Approved Trips');
    this.data11.emit('Approved Trips');
  }

  public RouteTracking() {
    this.active = 10.16;
    this.router.navigate(['/admin/routetracking']);
    localStorage.setItem('Pagename', 'Route Tracking');
    this.data11.emit('Route Tracking');
  }
  public routetracking() {
    this.active = 10.16;
    this.router.navigate(['/admin/routetracking']);
    localStorage.setItem('Pagename', 'Area Master');
    this.data11.emit('Area Master');
  }

  public attendanceReport() {
    this.active = 7.1;
    if (this.roleid == 11) {
      this.router.navigate(['/Manager/TeamAttendanceReports']);
      localStorage.setItem('Pagename', 'Attendance Report');
      this.data11.emit('Attendance Report');
    } else {
      this.router.navigate(['/Employee/AttendanceReport']);
      localStorage.setItem('Pagename', 'Attendance Report');
      this.data11.emit('Attendance Report');
    }
  }

  public attendanceCorrectionReport() {
    this.active = 7.2;
    this.router.navigate(['/Employee/AttendanceCorrectionReport']);
    localStorage.setItem('Pagename', 'Attendance Correction Report');
    this.data11.emit('Attendance Correction Report');
  }

  public leaveReport() {
    this.active = 7.3;
    this.router.navigate(['/Employee/LeaveReport']);
    localStorage.setItem('Pagename', 'Leave Report');
    this.data11.emit('Leave Report');
  }

  public timesheetReport() {
    this.active = 7.4;
    this.router.navigate(['/Employee/TimesheetReport']);
    localStorage.setItem('Pagename', 'Timesheet Report');
    this.data11.emit('Timesheet Report');
  }

  public employeeCertification() {
    this.active = 8;
    this.router.navigate(['/Employee/EmployeeCertificateDash']);
    localStorage.setItem('Pagename', 'Employee Certificate');
    this.data11.emit('Employee Certificate');
  }

  public help() {
    this.active = 9;
    this.router.navigate(['/Employee/Help']);
    localStorage.setItem('Pagename', 'Help');
    this.data11.emit('Help');
  }

  public payslip() {
    this.active = 21;
    this.router.navigate(['/Employee/Payslip']);
    localStorage.setItem('Pagename', 'Payslip');
    this.data11.emit('Payslip');
  }
}
