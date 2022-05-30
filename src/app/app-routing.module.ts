import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './components/estratejias/ventas/ventas.component';
import { AlmacenComponent } from './components/inventario/almacen/almacen.component';
import { ProductoComponent } from './components/inventario/producto/producto.component';
import { StockComponent } from './components/inventario/stock/stock.component';
import { CajeroComponent } from './components/menu/cajero/cajero.component';
import { GerenteComponent } from './components/menu/gerente/gerente.component';
import { CrudComponent } from './components/usuarios/crud/crud.component';
import { LoginComponent } from './components/usuarios/login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'index/cajero', component:CajeroComponent},
  {path:'index/gerente', component:GerenteComponent},
  {path:'usuarios', component:CrudComponent},
  {path:'productos',component:ProductoComponent},
  {path:'stock',component:StockComponent},
  {path:'almacen',component:AlmacenComponent},
  {path:'ventas',component:VentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
