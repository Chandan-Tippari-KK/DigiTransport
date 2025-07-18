import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ManagerRoutingModule } from './manager-routing.module';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    ManagerRoutingModule
  ],
})
export class ManagerModule {}
