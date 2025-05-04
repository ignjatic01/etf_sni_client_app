import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Polisa } from '../models/polisa';
import { PolisaService } from '../services/polisa.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-polisa',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './polisa.component.html',
  styleUrl: './polisa.component.css'
})
export class PolisaComponent implements OnInit {
  polisas: Polisa[] = [];
  paginatedPolisas: Polisa[] = [];

  currentPage: number = 1;
  pageSize: number = 3;
  numOfPages: number = 0;

  infoPoruka: string = "";

  constructor(private polisaService: PolisaService) {

  }

  ngOnInit(): void {
    const userString = localStorage.getItem("auth_token_full");
    if(userString) {
      const user = JSON.parse(userString);
      this.polisaService.getAllByUsername(user.username).subscribe(data => {
        this.polisas = data;
        this.numOfPages = Math.ceil(this.polisas.length / this.pageSize);
        this.updateTable();
      });
    }
  }

  get ukupneStraneArray(): number[] {
    return Array(this.numOfPages).fill(0).map((_, i) => i + 1);
  }

  updateTable(): void {
    const begin = (this.currentPage - 1) * this.pageSize;
    const end = begin + this.pageSize;
    this.paginatedPolisas = this.polisas.slice(begin, end);
  }

  changePage(novaStrana: number): void {
    if (novaStrana < 1 || novaStrana > this.numOfPages) return;
    this.currentPage = novaStrana;
    this.updateTable();
  }
}
