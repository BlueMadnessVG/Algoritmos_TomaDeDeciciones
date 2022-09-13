import { Component, OnInit } from '@angular/core';

//IMPORTACION DEL SERVICIO
import { CalcularService } from "./../calcular.service";

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent {
  
  //COLUMNAS TOTALES
  totalColums = 3;
  totalRows = 1;

  //ARREGLO DE DATOS
  rows: any[] = [];
  columns: any[] = ['Nombre', '1', '2'];

  //CARGAR EL JS DE LA CARPETA ASIGNADA
  constructor() {
    this.pushRow();
  }

  //FUNCION PARA AUMENTAR EL NUMERO DE COLUMNAS
  pushColums(){

    //aumentamos el numero de columnas
    this.totalColums += 1;

    //integramos en el array
    let last = this.columns[this.columns.length -1];
    this.columns.push(Number(last) + 1);

    //ingresamos datos a las filas
    for (let i = 0; i < this.totalRows; i++) {
      this.rows[i].push({value: '0', edit: false});
    }
    console.log(this.rows );

  }
  //FIN DE LA FUNCION

  //FUNCION PARA AUMENTAR EL NUMERO DE FILAS
  pushRow() { 
    //aumento en el numero de filas
    this.totalRows += 1; 

    //ingresamos datos base de la fila
    for (let i = 0; i < this.totalRows; i++) {
      let fila = [];

      for (let i = 0; i < this.totalColums; i++) {
        if (i == 0) {
          fila[i] = {
            value: 'n',
            edit: false,
          };
        }
        else{
          fila[i] = {
            value: (0).toString(),
            edit: false,
          };
        }

      }
      this.rows.push(fila);
    }
  }
  //FIN DE LA FUNCION

  ocultarCeldas(celda: any) {
    celda.edit = true;
    this.rows.forEach((f) => {
      f.forEach((c: any) => {
        if (c != celda) c.edit = false;
      });
    });
    console.log(this.rows);
  }

}
