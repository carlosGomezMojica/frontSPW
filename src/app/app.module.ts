import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { CrudComponent } from './components/usuarios/crud/crud.component';
import { AlmacenComponent } from './components/inventario/almacen/almacen.component';
import { ProductoComponent } from './components/inventario/producto/producto.component';
import { StockComponent } from './components/inventario/stock/stock.component';
import { VentasComponent } from './components/estratejias/ventas/ventas.component';
import { ReportesComponent } from './components/estratejias/reportes/reportes.component';
import { SalidaComponent } from './components/estratejias/salida/salida.component';
import { EstanteriaComponent } from './components/estratejias/estanteria/estanteria.component';
import { GerenteComponent } from './components/menu/gerente/gerente.component';
import { CajeroComponent } from './components/menu/cajero/cajero.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './components/menu/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrudComponent,
    AlmacenComponent,
    ProductoComponent,
    StockComponent,
    VentasComponent,
    ReportesComponent,
    SalidaComponent,
    EstanteriaComponent,
    GerenteComponent,
    CajeroComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[FormsModule]
})
export class AppModule { }
