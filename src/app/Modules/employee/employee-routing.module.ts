import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AnnouncementsDashComponent } from './Announcements/announcements-dash/announcements-dash.component';

import { HelpComponent } from './Help/help/help.component';

import { AuthguardGuard } from '../../Services/authguard.guard';
import { StaffDashComponent } from './TMS/Staff/staff-dash/staff-dash.component';
import { NewTicketsComponent } from './TMS/Tickets/new-tickets/new-tickets.component';
import { AcceptedTicketsComponent } from './TMS/Tickets/accepted-tickets/accepted-tickets.component';
import { ClosedTicketsComponent } from './TMS/Tickets/closed-tickets/closed-tickets.component';
import { CustomerComponent } from './TMS/Customer/customer/customer.component';
import { RejectTicketsComponent } from './TMS/Tickets/reject-tickets/reject-tickets.component';
import { DashboardComponent } from './TMS/dashboard/dashboard.component';
import { AgmmapComponent } from './TMS/Staff/agmmap/agmmap.component';
import { ClientofficedashComponent } from './TMS/Staff/clientofficedash/clientofficedash.component';
import { SecurityGuardDashComponent } from './TMS/Staff/security-guard-dash/security-guard-dash.component';



const routes: Routes = [
//  { path: 'AnnouncementsDash', component: AnnouncementsDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'StaffDash', component:StaffDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'NewTickets', component:NewTicketsComponent ,canActivate: [AuthguardGuard]},
  { path: 'AcceptedTickets', component:AcceptedTicketsComponent ,canActivate: [AuthguardGuard]},
  { path: 'RejectedTickets', component:RejectTicketsComponent ,canActivate: [AuthguardGuard]},
  { path: 'ClosedTickets', component:ClosedTicketsComponent ,canActivate: [AuthguardGuard]},
  { path: 'Customer', component:CustomerComponent ,canActivate: [AuthguardGuard]},
  { path: 'Dashboard', component:DashboardComponent ,canActivate: [AuthguardGuard]},
  { path: 'GuardDashboard', component:SecurityGuardDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'agmmap', component:AgmmapComponent ,canActivate: [AuthguardGuard]},
  { path: 'Clientoffices', component:ClientofficedashComponent ,canActivate: [AuthguardGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
