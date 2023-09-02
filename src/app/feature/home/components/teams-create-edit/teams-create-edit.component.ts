import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Teams } from 'src/app/core/interfaces/teams.interfaces';
import { TeamsService } from 'src/app/core/services/teams.service';
import { DateFormatPipe } from 'src/app/shared/shared/pipes/date-format.pipe';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teams-create-edit',
  templateUrl: './teams-create-edit.component.html',
  styleUrls: ['./teams-create-edit.component.scss'],
  providers: []
})
export class TeamsCreateEditComponent implements OnInit, OnDestroy {

  formCreateEditTeam: FormGroup;

  team: Teams;

  subject$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly config: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef,
    private readonly teamServices: TeamsService,
    private readonly messageService: MessageService,
    private readonly dateFormatPipe: DateFormatPipe,
    private translate: TranslateService) {
      this.team = config.data.team;
    }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formCreateEditTeam = this.formBuilder.group({
      nombre: [this.config.data.accion==2?this.team.nombre:'',Validators.required],
      estadio: [this.config.data.accion==2?this.team.estadio:''],
      sitioWeb: [this.config.data.accion==2?this.team.sitioWeb:''],
      nacionalidad: [this.config.data.accion==2?this.team.nacionalidad:''],
      fundacion: ['', Validators.required],
      entrenador: [this.config.data.accion==2?this.team.entrenador:''],
      capacidad: [this.config.data.accion==2?this.team.capacidad:undefined],
      valor: [this.config.data.accion==2?this.team.valor:undefined]
    });
    if (this.config.data.accion == 2 && this.team.fundacion) {
      const currentDate = new Date(this.team.fundacion);
      this.formCreateEditTeam.get('fundacion')?.setValue(this.dateFormatPipe.transform(currentDate));
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    const team: Teams = this.setearData();
    if (this.config.data.accion == 1) {
      this.teamServices.create(team).pipe(takeUntil(this.subject$)).subscribe((response: Teams) => {
        if (response) {
          this.messageService.add({ key: 'tst', severity:'success', summary: 'Success', detail: this.translate.instant('dialogs.alerts.create-team-success')});
          setTimeout(() => {
            this.dialogRef.close();
          }, 300);
        }
        else {
          this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.create-team-error')});
        }
      }, error => {
        this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.create-team-error')});
      });
    }
    else if (this.config.data.accion == 2) {
      team.id = this.team.id;
      this.teamServices.edit(team).pipe(takeUntil(this.subject$)).subscribe((response: Teams) => {
        if (response) {
          this.messageService.add({key: 'tst', severity:'success', summary: 'Success', detail: this.translate.instant('dialogs.alerts.edit-team-success')});
          setTimeout(() => {
            this.dialogRef.close();
          }, 300);
        }
        else {
          this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.edit-team-error')});
        }
      }, error => {
        this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.edit-team-error')});
      });
    }
  }

  setearData(): Teams {
    return {
      nombre: this.formCreateEditTeam.get('nombre')?.value,
      estadio: this.formCreateEditTeam.get('estadio')?.value,
      sitioWeb: this.formCreateEditTeam.get('sitioWeb')?.value,
      nacionalidad: this.formCreateEditTeam.get('nacionalidad')?.value,
      fundacion: this.formCreateEditTeam.get('fundacion')?.value,
      entrenador: this.formCreateEditTeam.get('entrenador')?.value,
      capacidad: this.formCreateEditTeam.get('capacidad')?.value,
      valor: this.formCreateEditTeam.get('valor')?.value
    }
  }

  ngOnDestroy(): void {
    this.subject$.next;
    this.subject$.complete();
  }

}
