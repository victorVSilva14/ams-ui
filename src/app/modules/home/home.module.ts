import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeCardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule, 
    MatButtonModule
  ],
  exports: [HomeCardComponent]
})
export class HomeModule { }
