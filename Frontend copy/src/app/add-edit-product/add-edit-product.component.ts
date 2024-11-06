import { Component, OnInit } from '@angular/core';
//Libreria interna para forms
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';



@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit{

  productoForm: FormGroup;
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _productoService: ProductoService,
              private actRouter: ActivatedRoute //Se declara la variable actRouter para usar las funciones de captura de ID
  ){ 

    //importamos router para que cuando le damos aceptar vuelva a la ruta raíz
    this.productoForm = this.fb.group({
      name:['', Validators.required],
      description:['', Validators.required],
      price:['', Validators.required],
      stock:['', Validators.required]
    })

    this.id = this.actRouter.snapshot.paramMap.get('id')
    //snapshot.paramMap.get permite capturar el id que se pase por parametro.
  }
  
  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const PRODUCTO: Producto = {
      name: this.productoForm.get('name')?.value,
      description: this.productoForm.get('description')?.value,
      price: this.productoForm.get('price')?.value,
      stock: this.productoForm.get('stock')?.value
    }

    if(this.id !== null){
      this._productoService.putProducto(this.id,PRODUCTO).subscribe({
        next: data => {
          this.router.navigate(['/'])
        }
      })
    }else{
      console.log(PRODUCTO)
      this._productoService.postProducto(PRODUCTO).subscribe({
        next: data => {
          console.log("producto registrado");
          this.router.navigate(['/']) //con esto vuelve a la ruta raiz
        }, error: err => {
          console.log(err);
          this.productoForm.reset();
        }
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this._productoService.getProducto(this.id).subscribe({
        next: data => {
          this.productoForm.setValue({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
          })
        }, error: err => {
          console.log(err);
        }
      })
    }
  }

}
