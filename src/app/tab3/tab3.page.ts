import { Component, OnInit } from '@angular/core';
import { FilmeDetalhe, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  filmes: FilmeDetalhe[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor( private dataLocal: DataLocalService, private moviesService: MoviesService ) {}

  
  async ionViewWillEnter() {
    
    this.filmes = await this.dataLocal.carregarFavoritos();
    this.generos = await this.moviesService.carregarGeneros();
    this.filmesPorGenero( this.generos, this.filmes );
  }


  filmesPorGenero( generos: Genre[], filmes: FilmeDetalhe[] ) {

    this.favoritoGenero = [];

    generos.forEach( genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        fils: filmes.filter( fil => {
          return fil.genres.find( genre => genre.id === genero.id );
        })
      });

    });

    console.log(this.favoritoGenero);

    // {
    //   genero: 'Ação',
    //   filmes: [ ]
    // }
  }

}
