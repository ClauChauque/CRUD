import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  //la lista de productos:es del tipo array de objetos = igual a un array vacio
  listProducts:Producto[] = [];
  constructor(private _productoService:ProductoService, private actRouter: ActivatedRoute) {}
  //ActivatedRoute ayuda a capturar el ID en la ruta
  ngOnInit(): void {
      this.obtenerProductos();
  }

  //Se genera el método obtenerProductos
  obtenerProductos(){
    this._productoService.getProductos().subscribe({
      next: data =>{
        console.log(data);
        this.listProducts = data;
      }, error: err =>{
        console.log(err)
      }
    })
  }

  //Método para eliminar producto
  eliminarProducto(id:any){
    this._productoService.deleteProducto(id).subscribe({
      next: data => {
        this.obtenerProductos();
      }, error: err => {
        console.log(err);
      }
    })
  }
}
