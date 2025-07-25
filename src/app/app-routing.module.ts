import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
// import { LoginComponent } from './Pages/login/login.component';
import { AuthguardGuard } from './Services/authguard.guard'

const routes: Routes = [

  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthguardGuard] },
  { path: 'Employee', loadChildren: () => import('./Modules/employee/employee.module').then(m => m.EmployeeModule), canActivate: [AuthguardGuard] },
  { path: 'HR', loadChildren: () => import('./Modules/hr/hr.module').then(m => m.HrModule), canActivate: [AuthguardGuard] },

];

 
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
