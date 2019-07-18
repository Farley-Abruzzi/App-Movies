import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FilmeDetalhe } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  filmes: FilmeDetalhe[] = [];

  constructor( private storage: Storage, private toastCtrl: ToastController ) {

    this.carregarFavoritos();
   }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarFilme( filme: FilmeDetalhe ) {

    let existe = false;
    let msg = '';

    for ( const fil of this.filmes ) {
      if ( fil.id === filme.id ) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.filmes = this.filmes.filter( fil => fil.id !== filme.id );
      msg = 'Removido dos favoritos!';
    } else {
      this.filmes.push( filme );
      msg = 'Adicionado aos favoritos!';
    }

    this.presentToast( msg );
    this.storage.set('filmes', this.filmes );

    return !existe;
  }

  async carregarFavoritos() {

    const filmes = await this.storage.get('filmes');
    this.filmes = filmes || [];
    return this.filmes;
  }

  async existeFilme( id ) {

    await this.carregarFavoritos();
    const existe = this.filmes.find( fil => fil.id === id );

    return (existe) ? true : false;

  }
}
