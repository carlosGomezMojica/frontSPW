import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { map, Observer, Subscription } from 'rxjs'
import { AccessService } from 'src/app/services/access.service'

import swal from 'sweetalert2'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit, OnDestroy {

  public productos:any;
  public producto:String='';
  public cantidad?:Number;
  public listaVenta:any =[];
  private ventasModel:any=[];

  public sub: Subscription;
  public temporal: any;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public access: AccessService,
  ) {
    this.sub = this.temporal;
   }

  ngOnInit(): void {
    this.listarProductos()
  }
  
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  listarProductos() {
    const anyObserver: Observer<any> = {
      next(response) {
        console.log(response)
      },
      error(error) {
        console.log(error)
      },
      complete() {
        console.log('Complete')
      },
    }
    this.sub = this.access
      .listarProductos()
      .pipe(
        map((res) => {
          this.productos = res.body.productos
        }),
      )
      .subscribe(anyObserver)
  }

  agregar(){
    let arr = this.producto.split(';');
    this.listaVenta.push({
      nombre:arr[1],
      _id_producto:arr[0],
      cantidad:this.cantidad
    })
    this.ventasModel.push({
      _id_producto:arr[0],
      cantidad:this.cantidad
    })
  }

  crear(){
    const newVenta = {
      id_usuario:localStorage.getItem('idUsuario'),
      ventas:this.ventasModel
    }
    console.log(newVenta)
    const anyObserver: Observer<any> = {
      next(response) {
        console.log(response)
      },
      error(error) {
        console.log(error)
      },
      complete() {
        console.log('Complete')
      },
    }
    this.sub = this.access
      .crearStock(newVenta)
      .pipe(
        map((res) => {
          if ((res.success = true)) {
            swal.fire(
              'success',
              'Se a realizado la venta',
              'success',
            )
            this.listaVenta = [];
            this.ventasModel = [];
          } else {
            swal.fire(
              'error',
              'No se a realizado',
              'error',
            )
          }
        }),
      )
      .subscribe(anyObserver)
  }

  eliminar(item:any){
    this.listaVenta.pop(item);
    this.ventasModel.pop(item);
  }

}
