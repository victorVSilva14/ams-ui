import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplineCardComponent } from './discipline-card/discipline-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DisciplineFormComponent } from './discipline-form/discipline-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DisciplineService } from 'src/app/services/discipline.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DisciplineCardComponent,
    DisciplineFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule
  ],
  entryComponents: [
    DisciplineFormComponent
  ],
  exports: [
    DisciplineCardComponent
  ],
  providers: [
    DisciplineService
  ]
})
export class DisciplineModule { }
