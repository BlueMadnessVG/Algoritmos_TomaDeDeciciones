import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcularService {

  constructor() { }

  //Craga los archivos .js en para ser usados en la pagina
  Carga( archivos:string[] ){

    //CREA ETIQUETAS SCRIPTS Y LAS INEGRA EN LE CUERPO DE LA PAGINA
    for( let archivo of archivos ){
      let script = document.createElement("script");
      script.src = "./assets/js/"+ archivo +".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
}
