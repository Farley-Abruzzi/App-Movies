import { Component, OnInit, Input } from '@angular/core';
import { Filme } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalheComponent } from '../detalhe/detalhe.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() filmes: Filme[] = [];

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async verDetalhe( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetalheComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
