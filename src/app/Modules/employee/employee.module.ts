import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  BsDatepickerModule  } from 'ngx-bootstrap/datepicker';

import { AngularEditorModule } from '@kolkov/angular-editor';




import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { AnnouncementsFormComponent } from './Announcements/announcements-form/announcements-form.component';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AnnouncementsDashComponent } from './Announcements/announcements-dash/announcements-dash.component';
import { StaffDashComponent } from './TMS/Staff/staff-dash/staff-dash.component';
import { StaffFormComponent } from './TMS/Staff/staff-form/staff-form.component';
import { NewTicketsComponent } from './TMS/Tickets/new-tickets/new-tickets.component';
import { AcceptedTicketsComponent } from './TMS/Tickets/accepted-tickets/accepted-tickets.component';
import { ClosedTicketsComponent } from './TMS/Tickets/closed-tickets/closed-tickets.component';
import { NewTicketsFormComponent } from './TMS/Tickets/new-tickets-form/new-tickets-form.component';
import { CustomerComponent } from './TMS/Customer/customer/customer.component';
import { CustomerFormComponent } from './TMS/Customer/customer-form/customer-form.component';
import { RejectTicketsComponent } from './TMS/Tickets/reject-tickets/reject-tickets.component';
import { DashboardComponent } from './TMS/dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { AgmmapComponent } from './TMS/Staff/agmmap/agmmap.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ClientofficeaddComponent } from './TMS/Staff/clientofficeadd/clientofficeadd.component';
import { ClientofficedashComponent } from './TMS/Staff/clientofficedash/clientofficedash.component';
import { SecurityGuardDashComponent } from './TMS/Staff/security-guard-dash/security-guard-dash.component';
import { SecurityGuardFormComponent } from './TMS/Staff/security-guard-form/security-guard-form.component';



@NgModule({
  declarations: [
    AnnouncementsFormComponent,
    AnnouncementsDashComponent,
    StaffDashComponent,
    StaffFormComponent,
    NewTicketsComponent,
    AcceptedTicketsComponent,
    ClosedTicketsComponent,
    NewTicketsFormComponent,
    CustomerComponent,
    CustomerFormComponent,
    RejectTicketsComponent,
    DashboardComponent,
    AgmmapComponent,
    ClientofficeaddComponent,
    ClientofficedashComponent,
    SecurityGuardDashComponent,
    SecurityGuardFormComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    FormsModule,
    AngularEditorModule,
    EmployeeRoutingModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgbModule,
    NgxPaginationModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_API_KEY'
    }),

    
  ]
})
export class EmployeeModule { }
