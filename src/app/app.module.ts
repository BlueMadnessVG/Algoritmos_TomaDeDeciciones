import { Interpolation } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//SERVICIO
import { CalcularService } from "./calcular.service";

import { AppComponent } from './app.component';
import { PaginaComponent } from './pagina/pagina.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    CalcularService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
