import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AuthService } from 'src/app/services/auth.service';



@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
