import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Teams } from 'src/app/core/interfaces/teams.interfaces';
import { TeamsService } from 'src/app/core/services/teams.service';
import { DateFormatPipe } from 'src/app/shared/shared/pipes/date-format.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teams-search',
  templateUrl: './teams-search.component.html',
  styleUrls: ['./teams-search.component.scss']
})
export class TeamsSearchComponent implements OnInit, OnDestroy {

  formSearchTeam: FormGroup;

  flagOptions: number;

  subject$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly teamServices: TeamsService,
    public readonly config: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly dateFormatPipe: DateFormatPipe,
    private translate: TranslateService) {}

    ngOnInit(): void {
      this.initForm();
    }

    initForm(): void {
      this.formSearchTeam = this.formBuilder.group({
        option1: [undefined],
        id: [{value: '', disabled: true}],
        option2: [undefined],
        initDate: [{value: '', disabled: true}],
        finishDate: [{value: '', disabled: true}]
      });
    }

    cancelar(): void {
      this.dialogRef.close();
    }

    consultar(): void {
      if (this.flagOptions == 1) {
        this.teamServices.searchById(Number(this.formSearchTeam.get('id')?.value)).pipe(takeUntil(this.subject$)).subscribe((response: Teams) => {
          if (response) {
            let teams: Teams[] = [];
            teams.push(response);
            localStorage.setItem('teams', JSON.stringify(teams));
            this.messageService.add({ key: 'tst', severity:'success', summary: 'Success', detail: this.translate.instant('dialogs.alerts.search-success')});
            setTimeout(() => {
              this.dialogRef.close();
            }, 300);
          }
          else {
            this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.search-error')});
          }
        }, error => {
          this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.search-error')});
        });
      }
      else if (this.flagOptions == 2) {
        this.teamServices.searchByDates(this.dateFormatPipe.transform(new Date(this.formSearchTeam.get('initDate')?.value)), this.dateFormatPipe.transform(new Date(this.formSearchTeam.get('finishDate')?.value))).pipe(takeUntil(this.subject$)).subscribe((response: Teams[]) => {
          if (response) {
            localStorage.setItem('teams', JSON.stringify(response));
            this.messageService.add({ key: 'tst', severity:'success', summary: 'Success', detail: this.translate.instant('dialogs.alerts.search-success')});
            setTimeout(() => {
              this.dialogRef.close();
            }, 300);
          }
          else {
            this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.search-error')});
          }
        }, error => {
          this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.search-error')});
        });
      }
    }

    radio1(): void {
      this.flagOptions = 1;
    }

    radio2(): void {
      this.flagOptions = 2;
    }

    ngOnDestroy(): void {
      this.subject$.next;
      this.subject$.complete();
    }

}
