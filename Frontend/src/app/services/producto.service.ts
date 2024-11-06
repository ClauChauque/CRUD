import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:3000/api/productos/';
  constructor( private http: HttpClient) { }

  getProductos():Observable<any>{
    return this.http.get(this.url)
    //Se accede al metodo http y retorna la url 'http://localohost:3000/api/productos' 
  }

  deleteProducto(id:string):Observable<any>{
    return this.http.delete(this.url + id);
  }

  postProducto(producto:Producto):Observable <any>{
    return this.http.post (this.url, producto);
  }

  getProducto(id: string):Observable <any> {
    return this.http.get (this.url + id);
  }

  putProducto(id: string, producto:Producto):Observable <any> {
    return this.http.put (this.url + id, producto);
  }

}
