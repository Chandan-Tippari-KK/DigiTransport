import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthguardGuard } from '../../Services/authguard.guard';
import { FleetlistComponent } from './Routematic/Fleet/fleetlist/fleetlist.component';
import { AddfleetComponent } from './Routematic/Fleet/addfleet/addfleet.component';
import { DriverlistComponent } from './Routematic/Drivers/driverlist/driverlist.component';
import { AdddriverComponent } from './Routematic/Drivers/adddriver/adddriver.component';
import { CompanydashComponent } from './Routematic/companydash/companydash.component';
import { EmployeeroasterdashComponent } from './Routematic/employeeroasterdash/employeeroasterdash.component';
import { FlettmappingdashComponent } from './Routematic/flettmappingdash/flettmappingdash.component';
import { TripdetailsComponent } from './Routematic/tripdetails/tripdetails.component';
import { AreaMasterDashboardComponent } from './Routematic/AreaMaster/area-master-dashboard/area-master-dashboard.component';
import { AddAreaMasterComponent } from './Routematic/AreaMaster/add-area-master/add-area-master.component';
import { RouteMasterDashboardComponent } from './Routematic/RouteMaster/route-master-dashboard/route-master-dashboard.component';
import { AddRouteMasterComponent } from './Routematic/RouteMaster/add-route-master/add-route-master.component';
import { MyProfileComponent } from './Routematic/MyProfile/my-profile/my-profile.component';
import { AssignedtripsComponent } from './Routematic/assignedtrips/assignedtrips.component';
import { ApprovedtripsComponent } from './Routematic/approvedtrips/approvedtrips.component';
import { RoutetrackingComponent } from './Routematic/routetracking/routetracking.component';
import { AgmmapComponent } from '../employee/TMS/Staff/agmmap/agmmap.component';
import { ClientLoginsComponent } from './Routematic/ClientLogins/client-logins/client-logins.component';

const routes: Routes = [
  //  { path: 'AnnouncementsDash', component: AnnouncementsDashComponent ,canActivate: [AuthguardGuard]},
  {
    path: 'Fleetlist',
    component: FleetlistComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Addfleet',
    component: AddfleetComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Driverlist',
    component: DriverlistComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Adddriver',
    component: AdddriverComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Companydash',
    component: CompanydashComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'employeeroaster',
    component: EmployeeroasterdashComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Flettmappingdash',
    component: FlettmappingdashComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'tripdetails',
    component: TripdetailsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'AreaMasterDashboard',
    component: AreaMasterDashboardComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'AddAreaMaster',
    component: AddAreaMasterComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'RouteMasterDashboard',
    component: RouteMasterDashboardComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'AddRouteMaster',
    component: AddRouteMasterComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'MyProfile/:id',
    component: MyProfileComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'assignedtrip',
    component: AssignedtripsComponent,
    canActivate: [AuthguardGuard],
  },

  {
    path: 'approvedtrip',
    component: ApprovedtripsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'routetracking',
    component: RoutetrackingComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'ClientLogin',
    component: ClientLoginsComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'agmmap',
    component: AgmmapComponent,
    canActivate: [AuthguardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
