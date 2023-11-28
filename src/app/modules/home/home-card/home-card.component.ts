import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  constructor() { }

  categoria = [
    { id: 1, name: 'Graduação' }
  ]

  ngOnInit(): void {
  }

}
