import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Responses } from 'src/app/core/interfaces/default.interfaces';
import { Teams } from 'src/app/core/interfaces/teams.interfaces';
import { TeamsService } from 'src/app/core/services/teams.service';
import { TeamsCreateEditComponent } from '../teams-create-edit/teams-create-edit.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TeamsSearchComponent } from '../teams-search/teams-search.component';
import { Login } from 'src/app/core/interfaces/auth.interfaces';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit, OnDestroy{

  teams: Teams[];

  init = 0;
  finish = 10;

  createEditFlag = false;

  ref: DynamicDialogRef = new DynamicDialogRef;

  auth: Login;

  subject$ = new Subject();

  public activeLang = 'es';

  constructor(
    private readonly teamsServices: TeamsService,
    private readonly dialogService: DialogService,
    private readonly confirmService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private translate: TranslateService
  ){
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit(): void {
    this.list();
    this.storageAuth();
  }

  storageAuth(): void {
    const auth: any = sessionStorage.getItem('auth');
    this.auth = auth?JSON.parse(auth):null;
  }

  list(): void {
    this.teamsServices.list(this.init,  this.finish).pipe(takeUntil(this.subject$)).subscribe((response: Responses) => {
      this.teams = response.content;
      localStorage.removeItem('teams')
    }, error => {
      this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.load-teams-error')});
    });
  }

  createEdit(action: number, team?: Teams): void {
    this.ref = this.dialogService.open(TeamsCreateEditComponent, {
      data: {
        accion: action,
        team
      },
      header: action==1?this.translate.instant('forms.teams.title1'):this.translate.instant('forms.teams.title2'),
      width: '50%',
      contentStyle: {"overflow": "auto"},
    });

    this.ref.onClose.subscribe(
      ()=>{
          this.list();
    });
  }

  delete(team: Teams): void {
    this.confirmService.confirm({
      key: 'confirmarEliminar',
      message: this.translate.instant('dialogs.confirm.delete-team').concat('(' + team.nombre + ')?'),
      accept: () => {
        this.teamsServices.delete(team).pipe(takeUntil(this.subject$)).subscribe(() => {
          this.messageService.add({ key: 'tst', severity:'success', summary: 'Success', detail: this.translate.instant('dialogs.alerts.delete-team-success')});
          this.list();
        }, error => {
          this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.delete-team-error')});
        });
      }
    });
  }

  search(): void  {
    this.ref = this.dialogService.open(TeamsSearchComponent, {
      header: this.translate.instant('forms.search.title'),
      width: '50%',
      contentStyle: {"overflow": "auto"},
    });
    this.ref.onClose.subscribe(
      ()=>{
        const teams: any = localStorage.getItem('teams');
        teams?this.teams = JSON.parse(teams):'';
    });
  }

  reload(): void {
    this.list();
  }

  login(): void {
    this.ref = this.dialogService.open(LoginComponent, {
      header: this.translate.instant('forms.login.title'),
      width: '40%',
      contentStyle: {"overflow": "auto"},
    });

    this.ref.onClose.subscribe(
      ()=>{
        this.storageAuth();
    });
  }

  logout(): void {
    this.confirmService.confirm({
      key: 'confirmarEliminar',
      message: this.translate.instant('dialogs.confirm.close-session'),
      accept: () => {
        this.authService.logOut().pipe(takeUntil(this.subject$)).subscribe(() => {
          sessionStorage.removeItem('auth');
          this.storageAuth();
          this.messageService.add({ key: 'tst', severity:'success', summary: 'Success', detail: this.translate.instant('dialogs.alerts.close-session-success')});
          this.list();
        }, error => {
          this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.close-sesssion-error')});
        });
      }
    });
  }

  openWebSite(webSite: string): void {
    window.open(webSite, '_blank');
  }

  ngOnDestroy(): void {
    this.subject$.next;
    this.subject$.complete();
  }

}
