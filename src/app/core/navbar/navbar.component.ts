import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
// import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
// import {NgIf, NgFor} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
// import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgIf, NgFor} from '@angular/common';
import { HomeModule } from 'src/app/modules/home/home.module';
import { CursoModule } from 'src/app/modules/curso/curso.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  // imports: [NgIf, MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, NgFor]
    imports: [
      NgIf,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatCheckboxModule,
      NgFor,
      HomeModule,
      CursoModule
    ]
})
export class NavbarComponent {
  mobileQuery: MediaQueryList;
  showFrequency: boolean = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleFrequency() {
    this.showFrequency = !this.showFrequency;
  }
}
