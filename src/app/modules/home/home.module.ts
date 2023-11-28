import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CursoModule } from '../curso/curso.module';
import { RegistryModule } from '../registry/registry.module';
import { DisciplineModule } from '../discipline/discipline.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeCardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule, 
    MatButtonModule,
    MatDialogModule,
    CursoModule,
    DisciplineModule,
    RegistryModule
  ],
  exports: [HomeCardComponent]
})
export class HomeModule { }
