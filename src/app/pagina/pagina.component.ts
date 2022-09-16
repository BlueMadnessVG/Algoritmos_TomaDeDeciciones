import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

//IMPORTACION DEL SERVICIO
import { CalcularService } from "./../calcular.service";

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent {
  
  resultados: boolean  = false;

  //COLUMNAS TOTALES
  totalColums = 3;
  totalRows = 1;

  //ARREGLO DE DATOS
  rows: any[] = [];
  columns: any[] = ['Nombre', '1', '2'];
  names: any[] = [];

  //DATOS DEL ALGORITMO
  p: number = 0.7;
  q: number = 0.3;

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

  //Funcion para mostrar y ocultar el imput
  ocultarCeldas(celda: any) {
    celda.edit = true;
    this.rows.forEach((f) => {
      f.forEach((c: any) => {
        if (c != celda) c.edit = false;
      });
    });
    console.log(this.rows);
  }


  CalcularParametros(){
    var Mmin: number = 0;
    var Mmin_name: string = "";

    //CICLO PARA RECORRER TODAS LAS VARIABLES
    for (let n = 0; n < this.columns.length - 1; n++) {

      //OBTENER EL VALOR DEL INPUT
      var Max_value: number = (this.rows[n][this.columns.length - 1]).value;
      //RECONOCER EL MAYOR
      if (Math.max(Mmin, Max_value) != Mmin) {
          Mmin = Max_value;
          Mmin_name = (this.rows[n][0]).value;
      }
    }
    //FIN DE CALCULAR MAX-MIN
    this.names.push({cal: 'MAX - MIN', nombre: Mmin_name});
    console.log(this.names);

    //CALCULAR MAXI-MAX
    var Mmax: number = 0;
    var Mmax_name: string = "";

    //CICLO PARA RECORRER TODAS LAS VARIABLES
    for (let i = 0; i < this.columns.length - 1; i++) {

        //OBTENER EL VALOR DEL INPUT
        var Max_value: number = (this.rows[i][1]).value;
        //RECONOCER EL MAYOR
        if (Math.max(Mmax, Max_value) != Mmax) {
            Mmax = Max_value;
            Mmax_name = (this.rows[i][0]).value;
        }
    }
    this.names.push({cal: 'MAXI - MAX', nombre: Mmax_name});
    console.log(Mmax_name);
    //FIN DE CALCULAR MAXI-MAX

    //CALCULAR OPTIMISMO - PESIMISMO
    var op: number = 0;
    var op_name:string = "";

    for (let i = 0; i < this.columns.length - 1; i++) {
        //OBTENER EL VALOR DEL INPUT
        var op_max:number = (this.rows[i][1]).value;
        var op_min:number = (this.rows[i][this.columns.length - 1]).value;;

        var cof = (op_max * this.p) + (op_min * this.q);

        if (op < cof) {
            op = cof
            op_name = (this.rows[i][0]).value;
        }
    }
    console.log(op_name);
    this.names.push({cal: 'OPTIMISMO - PESIMISMO', nombre: op_name});
    //FIN DE CALCULAR OPTIMISMO - PESIMISMO

    //CALCULO DE LAPLACE
    var lap: number = 0;
    var lap_name: string = "";

    //CICLO PARA RECORRER TODOS LAS VARIABLES
    for (let i = 0; i < this.columns.length - 1; i++) {

        let sum: number = 0;
        //CICLO PARA RECORRER TODAS LOS VALORES
        for (let n = 1; n <= this.rows.length; n++) {
            sum = sum + Number(this.rows[i][n].value);
        }
        
        sum = sum / (this.columns.length - 1);
        if (lap < sum) {
            lap = sum

            lap_name = (this.rows[i][0]).value;
        }
    }
    console.log(lap_name);
    this.names.push({cal: 'LAPLACE', nombre: lap_name});
    //FIN DEL CALCULO LAPLACE

    //CALCULO DE CONSTO - OPORTUNIDAD
    var coeficientes = [];
    var co: number = 0;
    var co_name: string = "";


    console.log('este es el valor ' + this.rows[1][2].value);
    //CICLO PARA RECONOSER LOS COEFICIENTES MAS ALTOS
    for (let i = 1; i < this.rows.length + 1; i++) {
        coeficientes.push(0);
        for (let n = 0; n < this.columns.length - 1; n++) {
            if (Math.max(coeficientes[i - 1], this.rows[n][i].value) != coeficientes[i - 1]) {
                coeficientes[i - 1] = this.rows[n][i].value;
            }
        }
    }

    //CICLO PARA REALIZAR LA RESTA DE LOS NUMEROS
    for (let i = 0; i < this.columns.length - 1; i++) {

        let sum: number = 0;
        //CICLO PARA RECORRER TODAS LOS VALORES
        for (let n = 1; n < this.rows.length + 1; n++) {
            sum = sum + Number(Math.abs((coeficientes[n - 1] - this.rows[i][n].value)));
        }
        console.log(sum);
        
        sum = sum / Number(this.columns.length);
        if ((Math.min(co, sum) != co) || co == 0) {
            co = sum;

            co_name = this.rows[i][0].value;
        }
    }
    this.names.push({cal: 'CONSTO - OPORTUNIDAD', nombre: co_name});
    console.log(co_name);
    //FIN DEL CALCULA DE COSTO - OPORTUNIDAD

    this.resultados = true;
  }
}