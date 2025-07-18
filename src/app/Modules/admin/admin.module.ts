import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddfleetComponent } from './Routematic/Fleet/addfleet/addfleet.component';
import { FleetlistComponent } from './Routematic/Fleet/fleetlist/fleetlist.component';
import { AdddriverComponent } from './Routematic/Drivers/adddriver/adddriver.component';
import { DriverlistComponent } from './Routematic/Drivers/driverlist/driverlist.component';
import { StarRatingModule } from 'angular-star-rating';
import { CompanydashComponent } from './Routematic/companydash/companydash.component';
import { AddcompanyComponent } from './Routematic/addcompany/addcompany.component';
import { EmployeeroasterdashComponent } from './Routematic/employeeroasterdash/employeeroasterdash.component';
import { EmployeeroasteraddComponent } from './Routematic/employeeroasteradd/employeeroasteradd.component';
import { FlettmappingdashComponent } from './Routematic/flettmappingdash/flettmappingdash.component';
import { FlettmappingdashaddComponent } from './Routematic/flettmappingdashadd/flettmappingdashadd.component';
import { TripdetailsComponent } from './Routematic/tripdetails/tripdetails.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { RouteMasterDashboardComponent } from './Routematic/RouteMaster/route-master-dashboard/route-master-dashboard.component';
import { AddRouteMasterComponent } from './Routematic/RouteMaster/add-route-master/add-route-master.component';
import { AreaMasterDashboardComponent } from './Routematic/AreaMaster/area-master-dashboard/area-master-dashboard.component';
import { AddAreaMasterComponent } from './Routematic/AreaMaster/add-area-master/add-area-master.component';
import { MyProfileComponent } from './Routematic/MyProfile/my-profile/my-profile.component';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ClientLoginsComponent } from './Routematic/ClientLogins/client-logins/client-logins.component';
import { AddClientLoginComponent } from './Routematic/ClientLogins/add-client-login/add-client-login.component';
import { AddtripdeatilsComponent } from './Routematic/addtripdeatils/addtripdeatils.component';
import { AssignedtripsComponent } from './Routematic/assignedtrips/assignedtrips.component';
import { ApprovedtripsComponent } from './Routematic/approvedtrips/approvedtrips.component';
import { RoutetrackingComponent } from './Routematic/routetracking/routetracking.component';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    AddfleetComponent,
    FleetlistComponent,
    AdddriverComponent,
    DriverlistComponent,
    CompanydashComponent,
    AddcompanyComponent,
    EmployeeroasterdashComponent,
    EmployeeroasteraddComponent,
    FlettmappingdashComponent,
    FlettmappingdashaddComponent,
    TripdetailsComponent,
    RouteMasterDashboardComponent,
    AddRouteMasterComponent,
    AreaMasterDashboardComponent,
    AddAreaMasterComponent,
    MyProfileComponent,
    ClientLoginsComponent,
    AddClientLoginComponent,
    AddtripdeatilsComponent,
    AssignedtripsComponent,
    ApprovedtripsComponent,
    RoutetrackingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GooglePlaceModule,
    StarRatingModule.forRoot(),
    AngularEditorModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgbModule,
    NgxPaginationModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    AdminRoutingModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_API_KEY'
    }),

  ]
})
export class AdminModule { }
