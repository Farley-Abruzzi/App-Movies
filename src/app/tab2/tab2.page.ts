import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Filme } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalheComponent } from '../components/detalhe/detalhe.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  filmes: Filme[] = [];
  ideias: string[] = ['Spiderman', 'Avenger', 'Iron Man', 'Matrix'];


  constructor( private moviesService: MoviesService, private modalCtrl: ModalController ) {
    
  }

  burcar( event ) {
    const valor: string = event.detail.value;

    if ( valor.length === 0 ) {
      this.buscando = false;
      this.filmes = [];
      return;
    }
    // console.log(valor);
    this.buscando = true;

    this.moviesService.buscarFilmes( valor )
      .subscribe( resp => {
        console.log( resp );
        this.filmes = resp['results'];
        this.buscando = false;
      });
  }
  async detalhe( id: string ) {

      const modal = await this.modalCtrl.create({
        component: DetalheComponent,
        componentProps: {
          id
        }
      });
  
      modal.present();
  }

}
