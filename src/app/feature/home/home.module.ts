import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { TeamsCreateEditComponent } from './components/teams-create-edit/teams-create-edit.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TeamsSearchComponent } from './components/teams-search/teams-search.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    TeamsListComponent,
    TeamsCreateEditComponent,
    LoginComponent,
    TeamsSearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ]
})
export class HomeModule { }
