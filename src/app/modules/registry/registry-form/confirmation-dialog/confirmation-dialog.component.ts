import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { RegistryResource } from 'src/app/models/registry-resource';
import { RegistryService } from 'src/app/services/registry.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

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

  constructor(
    private registryService: RegistryService,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getLastRegistry();
  }

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
        this.dialogRef.close(this.snackbarMessage);
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
        this.dialogRef.close(this.snackbarMessage);
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
    this.dialogRef.close(this.snackbarMessage);
  }

}
