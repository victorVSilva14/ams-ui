import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisciplineFormComponent } from '../../discipline/discipline-form/discipline-form.component';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  categoria = [
    { id: 1, name: 'Graduação' }
  ]

  ngOnInit(): void {
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
