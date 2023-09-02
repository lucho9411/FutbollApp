import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { DateFormatPipe } from './shared/shared/pipes/date-format.pipe';
import { LoadingInterceptor } from './config/interceptors/loading.interceptor';
import { LoaderComponent } from './shared/shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [DateFormatPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
