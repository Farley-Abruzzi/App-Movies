import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filme } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalheComponent } from '../detalhe/detalhe.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() filmes: Filme[] = [];
  @Output() carregarMais = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {}

  onClick() {
    this.carregarMais.emit();
  }

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
