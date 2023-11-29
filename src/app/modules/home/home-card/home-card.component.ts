import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisciplineFormComponent } from '../../discipline/discipline-form/discipline-form.component';
import { User } from 'src/app/models/user-resource';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnumUserRole } from 'src/app/enums/enum-roles';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  public user: User = new User();

  public isUserAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserByUsername();
  }

  getUserByUsername(): void {
    if (this.userService.currentUserValue && this.userService.currentUserValue.username) {
      this.authService.findByUsername(this.userService.currentUserValue.username)
        .subscribe(
          (data) => {
            this.user = data;
            this.isUserAdmin = data.roles === EnumUserRole.ROOT;
          },
          (error) => {
            console.error('Erro ao buscar usuário:', error);
          }
        );
    }
  }

  checkIsUserAdmin() {
    this.isUserAdmin = this.user != null && this.user.roles === EnumUserRole.ROOT;
  }

  openDialogDiscipline() {
    const dialogRef = this.dialog.open(DisciplineFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Alguma ação após fechar o modal, se necessário
    });
  }
}
