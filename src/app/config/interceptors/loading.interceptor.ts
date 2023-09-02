import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Entró al Interceptor!!!');
    this.loaderService.show();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigateByUrl('/');
          this.loaderService.hide();
        }
        this.loaderService.hide();
        return throwError( error );

      }), finalize (() => {
        this.loaderService.hide();
      })
    );
  }
}
