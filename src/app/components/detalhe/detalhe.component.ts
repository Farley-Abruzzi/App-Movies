import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { FilmeDetalhe, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss'],
})
export class DetalheComponent implements OnInit {

  @Input() id;

  filme: FilmeDetalhe = {};
  atores: Cast[] = [];
  oculto = 150;
  estrela = 'star-outline';

  slideOptAtores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  constructor( private moviesServices: MoviesService, 
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService ) { }

  ngOnInit() {
    // console.log('ID', this.id);
    this.dataLocal.existeFilme( this.id )
      .then( existe => this.estrela = (existe) ? 'star' : 'star-outline' );

    this.moviesServices.getFilmeDetalhe( this.id )
      .subscribe( resp => {
        console.log( resp );
        this.filme = resp;
      });

      this.moviesServices.getFilmeAtores( this.id )
      .subscribe( resp => {
        console.log( resp );
        this.atores = resp.cast;
      });
  }
  regressar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarFilme( this.filme );
    this.estrela = (existe) ? 'star' : 'star-outline';
  }

}
