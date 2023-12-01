import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discipline } from 'src/app/models/discipline-resource';
import { DisciplineService } from 'src/app/services/discipline.service';
import { DisciplineFormComponent } from '../discipline-form/discipline-form.component';

@Component({
  selector: 'app-discipline-card',
  templateUrl: './discipline-card.component.html',
  styleUrls: ['./discipline-card.component.css']
})
export class DisciplineCardComponent implements OnInit {

  public disciplines: Discipline[] = [];
  public cols: number = 5;
  public screenSize: string = 'lg';
  public defaultImage = 'https://img.freepik.com/vetores-gratis/design-plano-sem-sinal-de-foto_23-2149299705.jpg?w=740&t=st=1701189949~exp=1701190549~hmac=7c77a825fc1df80056d07441391e30f55bae2fb46c23c160d3d94eb7a97e6b70';
  public addImage = "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png";
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private disciplineService: DisciplineService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.getAllDiscipline();
  }

  private getAllDiscipline() {
    this.disciplineService.getAllDisciplines().subscribe(
      (data: Discipline[]) => {
        this.disciplines = data;
      },
      error => {
        console.error('Erro ao carregar disciplinas: ', error);
      }
    );
  }

  openDialogDisciplineForm(itemId: any) {
    this.disciplineService.getDisciplineById(itemId).subscribe((selectedDiscipline) => {
      if (selectedDiscipline) {
        this.dialog.open(DisciplineFormComponent, {
          width: '500px',
          data: selectedDiscipline,
        });
    }});
  }

  private checkScreenSize() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
        this.screenSize = 'sm';
        this.cols = 1;
      } else if (state.breakpoints[Breakpoints.Small]) {
        this.screenSize = 'sm';
        this.cols = 2;
      } else if (state.breakpoints[Breakpoints.Medium]) {
        this.screenSize = 'md';
        this.cols = 3;
      } else if (state.breakpoints[Breakpoints.Large]) {
        this.screenSize = 'lg';
        this.cols = 4;
      } else if (state.breakpoints[Breakpoints.XLarge]) {
        this.screenSize = 'xl';
        this.cols = 5;
      }
    });
  }
}
