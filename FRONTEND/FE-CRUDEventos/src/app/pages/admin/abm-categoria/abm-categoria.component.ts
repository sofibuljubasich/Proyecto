import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  selectedCategoria: Categoria | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  selectCategoria(categoria: Categoria): void {
    this.selectedCategoria = { ...categoria };
  }

  clearSelection(): void {
    this.selectedCategoria = null;
  }

  saveCategoria(): void {
    if (this.selectedCategoria) {
      if (this.selectedCategoria.id) {
        this.categoriaService.updateCategoria(this.selectedCategoria).subscribe(() => this.loadCategorias());
      } else {
        this.categoriaService.createCategoria(this.selectedCategoria).subscribe(() => this.loadCategorias());
      }
      this.clearSelection();
    }
  }

  deleteCategoria(id: number): void {
    this.categoriaService.deleteCategoria(id).subscribe(() => this.loadCategorias());
  }
}
