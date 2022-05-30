import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map, Observer, Subscription } from 'rxjs'
import { AccessService } from 'src/app/services/access.service'
import swal from 'sweetalert2'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit, OnDestroy {
  public nombre?: String;
  public descripcion?: String;
  public id: String = '';
  public productos: any;

  public sub: Subscription;
  public temporal: any;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public access: AccessService,
  ) {
    this.sub = this.temporal
  }

  ngOnInit(): void {
    this.listar()
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  create() {
    const newProducto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
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
      .crearProducto(newProducto)
      .pipe(
        map((res) => {
          if ((res.success = true)) {
            swal.fire(
              'success',
              'Se a guardado el usuario ' +
                this.nombre +
                ' en la base de datos',
              'success',
            )
            this.listar();
          } else {
            swal.fire(
              'error',
              'No se a guardado el usuario ' +
                this.nombre +
                ' en la base de datos',
              'error',
            )
          }
        }),
      )
      .subscribe(anyObserver)
  }

  listar() {
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

  cargarDatos(producto: any) {
    this.nombre = producto.nombre
    this.descripcion = producto.descripcion
    this.id = producto._id
  }

  actualizar() {
    const updateProducto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
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
      .actualizarProducto(this.id ,updateProducto)
      .pipe(
        map((res) => {
          if (res.success = true) {
            swal.fire('success','Se a actualizado el producto '+this.nombre+' en la base de datos','success');
            this.listar() ;
          } else {
            swal.fire('error','No se a actualizado el producto '+this.nombre+' en la base de datos','error');
          }
        }),
      )
      .subscribe(anyObserver)
  }

  eliminar(id: String) {
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
            .eliminarProducto(id)
            .pipe(
              map((res) => {
                if (res.success == true) {
                  swal.fire('Deleted!', 'El producto fue eliminado', 'success')
                } else {
                  swal.fire(
                    'error',
                    'El producto no a podido ser eliminado',
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
