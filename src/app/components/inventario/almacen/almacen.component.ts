import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { map, Observer, Subscription } from 'rxjs'
import { AccessService } from 'src/app/services/access.service'

import swal from 'sweetalert2'

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit,OnDestroy {
  public producto?:String;
  public productos: any;
  public cantidad?: Number;
  public id:String = '';
  public almacen:any;

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
    this.listar()
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

  crear(){
    const newAlmacen = {
      _id_producto:this.producto,
      cantidad:this.cantidad
    }

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
      .crearAlmacen(newAlmacen)
      .pipe(
        map((res) => {
          if ((res.success = true)) {
            swal.fire(
              'success',
              'Se a guardado el almacen',
              'success',
            );
            this.listar();
          } else {
            swal.fire(
              'error',
              'No se a guardado el almacen',
              'error',
            )
          }
        }),
      )
      .subscribe(anyObserver)

  }

  listar(){
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
      .listarAlmacen()
      .pipe(
        map((res) => {
          this.almacen = res.body.almacen
        }),
      )
      .subscribe(anyObserver);
  }

  cargarData(item:any){
    this.cantidad = item.cantidad;
    this.producto = item._id_producto._id;
    this.id = item._id;
  }

  actualizar(){
    const updateAlmacen = {
      _id_producto:this.producto,
      cantidad:this.cantidad
    }
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
      .actualizarAlmacen(this.id,updateAlmacen)
      .pipe(
        map((res) => {
          if (res.success = true) {
            swal.fire('success','Se a actualizado el almacen','success');
            this.listar() ;
          } else {
            swal.fire('error','No se a actualizado el almacen','error');
          }
        }),
      )
      .subscribe(anyObserver)
  }

  eliminar(id:String){
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
    swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.sub = this.access
            .eliminarAlmacen(id)
            .pipe(
              map((res) => {
                if (res.success == true) {
                  swal.fire('Deleted!', 'El almacen fue eliminado', 'success')
                } else {
                  swal.fire(
                    'error',
                    'El almacen no a podido ser eliminado',
                    'error',
                  )
                }
                this.listar()
              }),
            )
            .subscribe(anyObserver)
        }
      })

  }

}
