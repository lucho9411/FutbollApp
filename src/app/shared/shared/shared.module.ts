import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DividerModule} from 'primeng/divider';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    DialogModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule,
    RadioButtonModule,
    DividerModule,
    PasswordModule
  ],
  exports: [
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    DialogModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    InputNumberModule,
    ToastModule,
    ConfirmDialogModule,
    RadioButtonModule,
    DividerModule,
    PasswordModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService
  ]
})
export class SharedModule { }
