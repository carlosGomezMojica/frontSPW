import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AccessService {
  public objAccess: any;
  private access_token:any;
  private type:any;
  private urls = "https://back-gestor.vercel.app/dev"

  constructor(private http: HttpClient, private router: Router) {
  }

  // Métodos obligatorios
 
  public getAccess(): any {
    return this.objAccess;
  }

  // Logica de negocio
  public logout(): void {
    // Matar la sesion
    localStorage.removeItem(this.access_token);
    localStorage.removeItem(this.type);
    this.router.navigate(['/']);
    // Redirigir al usuario alconponente deseado
  }

  public getToken(): string {
    return localStorage.getItem(this.access_token) as string;
  }

  public login(access: any): Observable<any> {
    return this.http.post<any>(this.urls+"/auth/login", access);
  }

  public createUsuario(usuario:any):Observable<any> {
    return this.http.post<any>(this.urls+"/usuario/crear",usuario);
  }
  
  public getUsuario():Observable<any>{
    return this.http.get<any>(this.urls+"/usuario/listar");
  }

  public actualizarUsuario(id:String,usuario:any):Observable<any>{
    return this.http.post<any>(this.urls+"/usuario/actualizar/"+id,usuario);
  }

  public eliminarUsuario(id:String):Observable<any>{
    return this.http.delete<any>(this.urls+'/usuario/eliminar/'+id);
  }

  public crearProducto(producto:any):Observable<any>{
    return this.http.post<any>(this.urls+'/producto/crear',producto);
  }

  public listarProductos():Observable<any>{
    return this.http.get<any>(this.urls+'/producto/listar');
  }

  public actualizarProducto(id:String,producto:any):Observable<any>{
    return this.http.post<any>(this.urls+'/producto/actualizar/'+id,producto);
  }

  public eliminarProducto(id:String):Observable<any>{
    return this.http.delete<any>(this.urls+'/producto/eliminar/'+id);
  }

  public crearStock(stock:any):Observable<any>{
    return this.http.post<any>(this.urls+'/stock/crear',stock);
  }

  public listarStock():Observable<any>{
    return this.http.get<any>(this.urls+'/stock/listar');
  }

  public actualizarStock(id:String,stock:any):Observable<any>{
    return this.http.post<any>(this.urls+'/stock/actualizar/'+id,stock);
  }

  public eliminarStock(id:String):Observable<any>{
    return this.http.delete<any>(this.urls+'/stock/eliminar/'+id);
  }

  public crearAlmacen(almacen:any):Observable<any>{
    return this.http.post<any>(this.urls+'/almacen/crear',almacen);
  }

  public listarAlmacen():Observable<any>{
    return this.http.get<any>(this.urls+'/almacen/listar');
  }

  public actualizarAlmacen(id:String,almacen:any):Observable<any>{
    return this.http.post<any>(this.urls+'/almacen/actualizar/'+id,almacen);
  }

  public eliminarAlmacen(id:String):Observable<any>{
    return this.http.delete<any>(this.urls+'/almacen/eliminar/'+id);
  }

  public crearVenta(venta:any):Observable<any>{
    return this.http.post<any>(this.urls+'/ventas/crear',venta);
  }
  public checkUser(): boolean {
    if (localStorage.getItem(this.access_token)) {
      try {
        const checkObject: any = jwtDecode(this.getToken());
        this.objAccess.codUsuario = checkObject.codUsuario;
        this.objAccess.nombreRol = checkObject.nombreRol;
        this.objAccess.correoAcceso = checkObject.correoUsuario;
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}