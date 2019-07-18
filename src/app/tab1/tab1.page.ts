import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Filme } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  filmesRecentes: Filme[] = [];
  populares: Filme[] = [];

  constructor( private moviesService: MoviesService ) {}


  ngOnInit() {
    this.moviesService.getFeature()
      .subscribe( resp => {
        this.filmesRecentes = resp.results;
      });

    this.getPopulares();
  }
  carregarMais() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
      .subscribe( resp => {
        // console.log('Populares', resp);
        const arrTemp = [ ...this.populares, ...resp.results ];
        this.populares = arrTemp;
      });
  }
}
