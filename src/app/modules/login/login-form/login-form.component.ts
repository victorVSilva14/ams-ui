import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});

  public loginFailed = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login() {
    const user = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      this.authService.login(user.username, user.password).subscribe(
        response => {
          if (response) {
            this.loginFailed = false;
            this.userService.setCurrentUser(user);
            this.router.navigate(['/home']);
          } else {
            this.loginFailed = true;
          }
        },
        error => {
          console.error('Erro de login:', error);
        }
      );
    }
  }
}
