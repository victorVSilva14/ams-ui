import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoCardComponent } from './curso-card/curso-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CursoCardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule, 
    MatButtonModule
  ],
  exports: [CursoCardComponent]
})
export class CursoModule { }
