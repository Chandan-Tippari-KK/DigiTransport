import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TMS } from '../Services/TMS.service';
@Injectable()
export class InterceptorServiceInterceptor implements HttpInterceptor {

  authReq: any;
  currentUrl: any;
  constructor(public router: Router, public DigiofficeService: TMS) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger;
    let token1: any = localStorage.getItem('token');
    const token: any = atob(token1);
    let toekn: any = localStorage.getItem('antiforgerytoken');
    const antitoken = atob(toekn);

    const cookietoken = localStorage.getItem('cookietoken');
    this.currentUrl = window.location.href

    // Clone the request to add the new header.
    // debugger;

    // const headers = new HttpHeaders({
    //   'Authorization': `${token}`,
    //   'XSRF-TOKEN': `${token}`,
    //   'Cookie': 'xsrf-token=' + `${token}`,
    // });


    if (req.url.includes('GetMyDetailsForLogin') == true) {
      this.authReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      })
    } else if (req.url == 'https://asticom.digiofficeapp.com/AsticomHQTestWebAPI/Announcement/Authenicate') {
      this.authReq = req.clone({ 

      })
    }
    else if (req.url.includes('https://maps.googleapis.com/') == true) {
      this.authReq = req.clone({ 

      })
    }
    else {
      this.authReq = req.clone({
        setHeaders: {
          'Accept': '*/*',
          'XSRF-TOKEN': `${antitoken}`,
        },
        'withCredentials': true

      });
    }

    // const authReq = req.clone({

    //   headers: req.headers.set('Authorization', `${token}`),



    // });

    // debugger;
    next.handle(req);
    debugger;
    // console.log('Sending request with new header now ...');

    //send the newly created request
    return next.handle(this.authReq).pipe(
      catchError(err => {
        debugger
        console.log('Error Occurred');
        console.log('interceproit', err);
       
        // if (err.status === 400) {
        //   Swal.fire('Session is Expired or Cookies not Accepted. Please Login Again');
        //   localStorage.setItem('roledid', "0");
        //   this.router.navigate(['/Login']).then(() => {
        //     localStorage.clear();
        //     sessionStorage.clear();
        //     location.reload();

        //   })

        // }

        if (this.authReq.url.includes('InsertExceptionLogs') == true) {

        } else {
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message == null ? err.message : err.error.message,
            'EmailId': localStorage.getItem('EmployeeID'),
            'LoginType': localStorage.getItem('roledid'),
            'API': this.authReq.url
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }

        throw new Error(err);
      })) as any

  }
}



{ }

