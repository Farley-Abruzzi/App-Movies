import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespostaMovieDB, FilmeDetalhe, RespostaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private executarQuery<T>( query: string ) {

    query = URL + query;
    query += `&api_key=${ apiKey }&language=pt-br&include_image_language=pt-br`;

    return this.http.get<T>( query );
  }

  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.executarQuery<RespostaMovieDB>(query);

  }

  buscarFilmes( texto: string ) {
    return this.executarQuery(`/search/movie?query=${ texto }`);
  }

  getFeature() {

    const hj = new Date();
    const ultimoDia = new Date( hj.getFullYear(), hj.getMonth() + 1, 0).getDate();
    const mes = hj.getMonth() + 1;

    let mesString;

    if ( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hj.getFullYear() }-${ mesString }-01`;
    const fim = `${ hj.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.executarQuery<RespostaMovieDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fim }`);
  }

  getFilmeDetalhe( id: string ) {
    return this.executarQuery<FilmeDetalhe>(`/movie/${ id }?a=1`);
  }

  getFilmeAtores( id: string ) {
    return this.executarQuery<RespostaCredits>(`/movie/${ id }/credits?a=1`);
  }

  carregarGeneros(): Promise<Genre[]> {
    
    return new Promise( resolve => {

      this.executarQuery(`/genre/movie/list?a=1`)
        .subscribe( resp => {
          this.generos = resp['genres'];
          console.log(this.generos);
          resolve(this.generos);
        });

    });
    
  }

}
