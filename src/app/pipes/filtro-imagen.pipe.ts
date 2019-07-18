import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform( filmes: any[] ): any[] {

    return filmes.filter( fil => {
      return fil.backdrop_path;
      
    });
  }

}
