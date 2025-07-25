import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpInterceptor } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonalertpageComponent } from './Shared/commonalertpage/commonalertpage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from './Shared/shared-module/shared-module.module';
import { InterceptorServiceInterceptor } from './Shared/interceptor-service.interceptor';
import { SpinnerComponent } from './Shared/spinner/spinner.component';
import { StarRatingModule } from 'angular-star-rating';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    FormsModule,
    CommonModule,
    HttpClientModule,
    DatePipe,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    SharedModuleModule,
    NgxPaginationModule,
    SharedModuleModule,
    TimepickerModule.forRoot(),
  ],
  exports: [NgMultiSelectDropDownModule, TimepickerModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServiceInterceptor,
      multi: true,
    },
    DatePipe,
    CookieService,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
