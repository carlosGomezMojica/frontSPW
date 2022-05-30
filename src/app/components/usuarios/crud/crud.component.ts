import { LocationStrategy } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map, Observer, Subscription } from 'rxjs'
import { AccessService } from 'src/app/services/access.service'
import swal from 'sweetalert2'

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit, OnDestroy {
  //variables de form
  public ejem: any;
  public nombre?: String;
  public apellido?: String;
  public type?: String;
  public codigo?: number;
  public contrasena?: String;
  public id:String = '';

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
    const newUsuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      tipoUsuario: this.type,
      codigoUsuario: this.codigo,
      password: this.contrasena,
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
      .createUsuario(newUsuario)
      .pipe(
        map((res) => {
          if (res.success = true) {
            swal.fire('success','Se a guardado el usuario '+this.nombre+' en la base de datos','success');
            this.listar() ;
          } else {
            swal.fire('error','No se a guardado el usuario '+this.nombre+' en la base de datos','error');
          }
        }),
      )
      .subscribe(anyObserver)
  }

  cargarData(item:any){
    this.nombre = item.nombre;
    this.apellido = item.apellido;
    this.codigo = item.codigoUsuario;
    this.type = item.tipoUsuario;
    this.contrasena = item.password;
    this.id = item._id;
  }

  actualizar(){
    const updateUsuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      tipoUsuario: this.type,
      codigoUsuario: this.codigo,
      password: this.contrasena,
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
      .actualizarUsuario(this.id ,updateUsuario)
      .pipe(
        map((res) => {
          if (res.success = true) {
            swal.fire('success','Se a actualizado el usuario '+this.nombre+' en la base de datos','success');
            this.listar() ;
          } else {
            swal.fire('error','No se a actualizado el usuario '+this.nombre+' en la base de datos','error');
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
      .getUsuario()
      .pipe(
        map((res) => {
          this.ejem = res.body.usuario
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
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sub = this.access
      .eliminarUsuario(id)
      .pipe(
        map((res) => {
          if (res.success == true) {
            swal.fire(
              'Deleted!',
              'El usuario fue eliminado',
              'success'
            )
          } else {
            swal.fire(
              'error',
              'El usuario no a podido ser eliminado',
              'error'
            )
          }
          this.listar();
        }),
      )
      .subscribe(anyObserver)
       
      }
    })
  }
}
