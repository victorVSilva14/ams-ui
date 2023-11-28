import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryFormComponent } from './registry-form/registry-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './registry-form/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    RegistryFormComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [RegistryFormComponent]
})
export class RegistryModule { }
