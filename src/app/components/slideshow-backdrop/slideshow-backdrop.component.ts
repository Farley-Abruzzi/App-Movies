import { Component, OnInit, Input } from '@angular/core';
import { Filme } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalheComponent } from '../detalhe/detalhe.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() filmes: Filme[] = [];

  slideOpts = {
    slidesPerView: 1.3,
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
