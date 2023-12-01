import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RegistryService } from 'src/app/services/registry.service';
import { RegistryResource } from 'src/app/models/registry-resource';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent implements OnInit {

  public snackbarMessage: {
    message: {},
    success: boolean,
    error: {}
  } = {
    message: "",
    success: true,
    error: ""
  }

  lastRegistry: RegistryResource = {};

  public nomeAluno: string = '';
  public dataAtual: Date = new Date();
  public timeDisplay: any;
  
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _snackBar: MatSnackBar,
    private registryService: RegistryService,
    private userService: UserService
    // private dialogRef: MatDialogRef<RegistryFormComponent>
  ) {}

  ngOnInit(): void {
    setInterval(this.realDateTime, 1000);
    this.getLastRegistry();
    this.nomeAluno = this.userService.currentUserValue.username as string;
  }

  private openSnackBar(message: string, error?: string) {
    this._snackBar.open(message, 'x', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: error != null && error !== "" ? ['error'] : ['success']
    });
  }

  private realDateTime() {
    const time = document.getElementById("time");
  
    if (time) {
      let dateString = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
      let formattedString = moment(dateString, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss');
      time.innerHTML = formattedString;
    }
  }
  

  // public openDialog(): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '300px',
  //     height: '190px'
  //   });
  //   dialogRef.afterClosed().subscribe((snackbarMessage) => {
  //     if (snackbarMessage) {
  //       if (snackbarMessage.success) {
  //         this.openSnackBar(snackbarMessage.message);
  //       } else {
  //         this.openSnackBar(snackbarMessage.error.message ? snackbarMessage.error.message : snackbarMessage.message, snackbarMessage.error.error);
  //       }
  //     }
  //   })
  // }

  private getLastRegistry() {
    this.registryService.getLastRegistration().subscribe((registry) => {
      this.lastRegistry = registry;
    })
  }

  public register() {
    if (this.lastRegistry != null && !this.lastRegistry.exitDateTime) {
      this.registerExit();
    } else {
      this.registerEntry();
    }
  }

  private registerEntry() {
    this.registryService.registerEntry().subscribe(
      response => {
        this.snackbarMessage.message = 'Entrada registrada com sucesso.';
        // this.dialogRef.close(this.snackbarMessage);
      },
      error => {
        this.validateErrors(error, 'Erro ao registrar entrada');
      }
    );
  }

  private registerExit() {
    this.registryService.registerExit().subscribe(
      response => {
        this.snackbarMessage.message = 'Saída registrada com sucesso.';
        // this.dialogRef.close(this.snackbarMessage);
      },
      error => {
        this.validateErrors(error, 'Erro ao registrar saída');
      }
    );
  }
  
  private validateErrors(error: any, message: string) {
    this.snackbarMessage.message = message;
    this.snackbarMessage.success = false;
    this.snackbarMessage.error = error;
    // this.dialogRef.close(this.snackbarMessage);
  }

}
