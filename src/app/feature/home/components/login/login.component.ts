import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Login } from 'src/app/core/interfaces/auth.interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  formLogin: FormGroup;

  subject$ = new Subject();

  constructor(
    private readonly messageService: MessageService,
    private readonly formBuilder: FormBuilder,
    public readonly config: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef,
    private readonly authService: AuthService,
    private translate: TranslateService
  ){ }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formLogin = this.formBuilder.group({
      username: [undefined],
      password: [undefined]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  login(): void {
    const auth: Login = {
      username: this.formLogin.get('username')?.value,
      password: this.formLogin.get('password')?.value
    }
    this.authService.logIn(auth).pipe(takeUntil(this.subject$)).subscribe(response => {
      if (response) {
        sessionStorage.setItem('auth',  JSON.stringify(auth));
        this.messageService.add({ key: 'tst', severity:'success', summary: 'Success', detail: this.translate.instant('dialogs.alerts.login-success') + auth.username});
        setTimeout(() => {
          this.dialogRef.close();
        }, 300);
      }
      else {
        this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.login-error')});
      }
    }, error => {
      this.messageService.add({key: 'tst', severity:'warn', summary: 'Warn', detail: this.translate.instant('dialogs.alerts.login-error')});
    });
  }

  ngOnDestroy(): void {
    this.subject$.next;
    this.subject$.complete();
  }

}
