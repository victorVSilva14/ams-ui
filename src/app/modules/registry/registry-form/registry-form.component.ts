import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent implements OnInit {

  public nomeAluno: string = "VICTOR VIEIRA DA SILVA";
  public dataAtual: Date = new Date();
  public timeDisplay: any;
  
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    setInterval(this.realDateTime, 1000);
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
  

  public openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '190px'
    });
    dialogRef.afterClosed().subscribe((snackbarMessage) => {
      if (snackbarMessage) {
        if (snackbarMessage.success) {
          this.openSnackBar(snackbarMessage.message);
        } else {
          this.openSnackBar(snackbarMessage.error.message ? snackbarMessage.error.message : snackbarMessage.message, snackbarMessage.error.error);
        }
      }
    })
  }
}
