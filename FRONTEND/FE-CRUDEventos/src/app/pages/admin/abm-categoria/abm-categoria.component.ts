import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria, CategoriaResponse } from 'src/app/interfaces/categoria';
import { Location } from '@angular/common';

@Component({
  selector: 'app-abm-categoria',
  templateUrl: './abm-categoria.component.html',
  styleUrls: ['./abm-categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  categorias: CategoriaResponse[] = [];
  selectedCategoria: CategoriaResponse | null = null;
  isAddingNew = false;
  newEdadI = 0;
  newEdadF = 0;
  editCategoryId: number | null = null;
  editedEI: number = 0;
  editedEF: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
      console.log(this.categorias);
    });
  }
  selectCategoria(categoria: CategoriaResponse) {
    this.editCategoryId = categoria.id;
    this.editedEI = categoria.edadInicio;
    this.editedEF = categoria.edadFin;
  }

  aceptarEdicion() {
    const categoria = this.categorias.find((d) => d.id === this.editCategoryId);
    if (categoria) {
      categoria.edadInicio = this.editedEI;
      categoria.edadFin = this.editedEF;
      this.categoriaService
        .updateCategoria(categoria.id, categoria)
        .subscribe(() => this.loadCategorias());
    }
    this.cancelarEdicion();
  }

  cancelarEdicion() {
    this.editCategoryId = null;
    this.editedEI = 0;
    this.editedEF = 0;
  }
  goBack() {
    this._location.back();
  }

  deleteCategoria(id: number): void {
    this.categoriaService
      .deleteCategoria(id)
      .subscribe(() => this.loadCategorias());
  }
  agregarNuevaCategoria() {
    this.isAddingNew = true;
    this.newEdadI = 0;
    this.newEdadF = 0;
  }

  aceptarNuevaCategoria() {
    const newCategory = {
      edadInicio: this.newEdadI,
      edadFin: this.newEdadF,
    } as Categoria;
    console.log(newCategory);
    this.categoriaService
      .createCategoria(newCategory)
      .subscribe(() => this.loadCategorias());
    const nuevaCategoria = {
      id: this.categorias.length + 1,
      edadInicio: this.newEdadI,
      edadFin: this.newEdadF,
    };
    this.categorias.push(nuevaCategoria);
    this.isAddingNew = false;
  }

  cancelarNuevaCategoria() {
    this.isAddingNew = false;
    this.newEdadI = 0;
    this.newEdadF = 0;
  }
}
