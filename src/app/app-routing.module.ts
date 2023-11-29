import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { RegistryFormComponent } from './modules/registry/registry-form/registry-form.component';
import { LoginFormComponent } from './modules/login/login-form/login-form.component';
import { RegistrationFormComponent } from './modules/login/registration-form/registration-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: NavbarComponent },
  { path: 'add-registry', component: RegistryFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }