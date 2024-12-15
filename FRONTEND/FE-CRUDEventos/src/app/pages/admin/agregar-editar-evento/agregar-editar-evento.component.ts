import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../services/evento.service';
import { Categoria, Distancia, EventoData, EventoDistancia, EventoResponse, Tipo } from 'src/app/interfaces/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaResponse } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { DistanciaResponse } from 'src/app/interfaces/distancia';
import { DistanciaService } from 'src/app/services/distancia.service';
import { filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventoDistanciaService } from 'src/app/services/evento-distancia.service';

@Component({
  selector: 'app-agregar-editar-evento',
  templateUrl: './agregar-editar-evento.component.html',
  styleUrls: ['./agregar-editar-evento.component.css'],
})
export class AgregarEditarEventoComponent implements OnInit {
  eventForm: FormGroup;
  isEditing: boolean = false;
  isEditing2: boolean = false;
  isEditing3: boolean = false;
  id: number;
  imagenURL: string| null = null;
  currentEvent!: EventoResponse;
  selectedFile?: File;
  selectedFileUrl: string | null = null;
  categorias: CategoriaResponse[] = [];
  categoriasGral: CategoriaResponse[] = [];
  tipos: Tipo[] = [];
  dist: DistanciaResponse[] = [];
  distGral: DistanciaResponse[] = [];
  distancias: any[] = [];
  cat: any[] = [];
  evDist: EventoDistancia[]=[];
  categoriasID: number[]=[];
  
  eventoData: EventoData = {
    nombre: '',            // Nombre del evento vacío
    fecha: null,             // Fecha vacía (puede ser un string vacío o null dependiendo de tu caso de uso)
    lugar: '',             // Lugar vacío
    hora: '',              // Hora vacía
    eventoDistancias: [],
    tipoID: null          // tipoID vacío o null
  };
  eventoDataUpdate: any = {
    nombre: '',            // Nombre del evento vacío
    fecha: '',             // Fecha vacía (puede ser un string vacío o null dependiendo de tu caso de uso)
    lugar: '',             // Lugar vacío
    hora: '',              // Hora vacía
    estado: '',
    categoriasID: [],
    eventoDistancias: [],
    tipoID: null          
  };
  eventoDataCreate: any = {
    nombre: '',            // Nombre del evento vacío
    fecha: '',             // Fecha vacía (puede ser un string vacío o null dependiendo de tu caso de uso)
    lugar: '',             // Lugar vacío
    hora: '',
    categorias: [],
    eventoDistancias: [],
    tipoID: null          
  };
  categoriaSeleccionada: number = 0;
  distanciaSeleccionada:  number = 0;
  selectedCategoryId: number = 0;
  price: number =0;

  adding: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _eventoService: EventoService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private distanciaService: DistanciaService,
    private categoriaService: CategoriaService,
    private location: Location,
    private _tipoService: TipoEventoService,
    private snackBar: MatSnackBar,
    private _evDistService: EventoDistanciaService,
    private datePipe: DatePipe
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugar: ['', Validators.required],
      tipoID: ['', Validators.required],
      estado:[''],
      imagen: [null],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.getDist(); 
    this.obtenerEvento();


    this.obtenerTipo();
    console.log(this.eventForm.value.imagen)
  }
  selectTipo(tipo: string) {
    this.eventForm.get('tipo')?.setValue(tipo); // Establece el valor seleccionado
  }
  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categoriasGral= data
      this.cat=data
      console.log("categorias", this.categoriasGral)
      if (this.cat.length > 0) {
        this.categoriaSeleccionada = this.cat[0].id;
      }
      //if (this.cat.length > 0) {
      //  this.categoriaSeleccionada = this.cat[0].id;
      //  console.log(this.categoriaSeleccionada)
      //}
    });
  }
  aceptarCat() {
    const categoriaSelect = this.cat.find(
      (c) => c.id == this.categoriaSeleccionada
    );
    if (categoriaSelect) {
      // Lógica para agregar la categoría
      this.categorias.push(categoriaSelect);
      
      this.cat = this.cat.filter(c => c.id !== categoriaSelect.id);
      this.categoriaSeleccionada = this.cat[0].id;
    } else {
      console.error('Categoría no encontrada.');
    }

    this.cancelarCat();
  }
  deleteCategoria(id: number): void {
    let c = this.categorias.filter(c => c.id == id);
    this.categorias = this.categorias.filter(c => c.id !== id);

    this.cat.push(c[0]);
  }
  cancelarCat() {
    this.isEditing2=false
  }

  deleteDistancia(id: number): void {
    let c = this.distancias.filter(c => c.id == id);
    this.distancias = this.distancias.filter(c => c.id !== id);

    this.dist.push(c[0]);
  }
  aceptarDist() {
    if (this.distanciaSeleccionada !== 0 && this.price!==0){  
    const distanciaSelect = this.dist.find(
      (c) => c.id == this.distanciaSeleccionada
    );
 
    if (distanciaSelect) {
      console.log('Distancia seleccionada:', distanciaSelect);
      // Lógica para agregar la categoría
      this.distancias.push({distanciaID:distanciaSelect.id,km:distanciaSelect.km,precio:this.price});
      console.log("distancias del evento",this.distancias)
      this.price=0;
      this.dist = this.dist.filter(c => c.id !== distanciaSelect.id);
      this.distanciaSeleccionada = this.dist[0].id;
      console.log("dist predet", this.distanciaSeleccionada)
    } else {
      console.error('Distancia no encontrada.');
    }

    this.cancelarDist();
  }//else marcar todos y q aparezca error
  }
  cancelarDist() {
    this.isEditing3=false
  }
  getDist() {
    this.distanciaService.getDistancias().subscribe((data) => {
      this.distGral = data;
      this.dist=data
      if (this.dist.length > 0) {
        this.distanciaSeleccionada = this.dist[0].id;
      }
    });

  }
  obtenerTipo() {
    this._tipoService.getTipos().subscribe(
      (data: Tipo[]) => {
        this.tipos = data;
      },
      (error) => {
        console.error('Error al cargar los lugares', error);
      }
    );
  }
  obtenerEvento() {
    if (this.id) {
      this._eventoService.getEvento(this.id).subscribe((data) => {
        console.log(data)
        const fechaHora = new Date(data.evento.fecha);
        (this.currentEvent = data),

          this.eventForm.patchValue({
            nombre: data.evento.nombre,
            fecha: fechaHora.toISOString().split('T')[0], // Convertimos a formato ISO y extraemos solo la fecha
            hora: data.evento.hora.toString().slice(0, 5), // Extraemos solo la hora (hh:mm)
            lugar: data.evento.lugar,
            estado: data.evento.estado,
            tipoID: data.evento.tipo.id
            // Agrega otros campos según sea necesario
          });
        
        this.imagenURL= 'https://localhost:7296' + data.evento.imagen;
        this.categorias = data.categorias; // Cargamos las categorías del evento
        this.filtrarCategorias();
        this.distancias = data.distancias;
        this.filtrarDistancias();
        console.log(this.eventForm);
        console.log(this.distancias);

        // this.setDistancias(data.distancias);
        
      });
    }
  }
  filtrarCategorias(){
    this.cat = this.categoriasGral.filter(c => 
      !this.categorias.some(categoriaEvento => categoriaEvento.id === c.id))
    console.log("cat gral",this.categoriasGral)
    console.log("cat a elegir ",this.cat)
    console.log("cats evento",this.categorias)
    if (this.cat.length > 0) {
      this.categoriaSeleccionada = this.cat[0].id;
    }
  }
  filtrarDistancias(){
    this.dist = this.distGral.filter(d => 
      !this.distancias.some(de => de.id === d.id))
    console.log("dist gral",this.distGral)
    console.log("dist a elegir ",this.dist)
    console.log("dists evento",this.distancias)
    if (this.dist.length > 0) {
      this.distanciaSeleccionada = this.dist[0].id;
    }
  }
  onImageChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.eventForm.patchValue({
        imagen: file,
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(this.eventForm.value.imagen);
    }
  }
  goBack(): void {
    this.location.back();
  }

  getFormattedDate(date: string | Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }



  addCategoria(): void {
    this.isEditing2=true
    // Busca la categoría seleccionada en la lista `cat`
  }
  addDistancia(): void {
    this.isEditing3=true
    // Busca la categoría seleccionada en la lista `cat`
    
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    // Actualizar el valor del formulario si es necesario
    this.eventForm.patchValue({ fecha: selectedDate });
  }
  onHoraChange(event: any): void {
    const selectedHora = event.target.value;
    console.log('Fecha seleccionada:', selectedHora);
    // Actualizar el valor del formulario si es necesario
    this.eventForm.patchValue({ hora: selectedHora });
  }

  Guardar(): void {

    if (this.eventForm.valid || this.distancias.length !== 0 || this.categorias.length !== 0) {
      this.evDist= this.distancias.map((d: Distancia) => ({
        distanciaID:d.distanciaID,
        precio: d.precio
      }));  
      this.categoriasID=this.categorias.map((c: Categoria) => 
        c.id
      ); 
      //let fecha1= new Date (this.eventForm.value.fecha+" "+this.eventForm.value.hora)
      this.eventoDataUpdate = {
        ...this.eventoData, // Mantiene los valores anteriores
        nombre: this.eventForm.value.nombre,
        fecha:  new Date(`${this.eventForm.value.fecha}T${this.eventForm.value.hora}:00`),
        //fecha: fecha1.toISOString(),
        lugar: this.eventForm.value.lugar,
        hora: `${this.eventForm.value.hora}:00`,
        estado:this.eventForm.value.estado,
        tipoID: this.eventForm.value.tipoID,
        categoriasID: this.categoriasID,
        eventoDistancias: this.evDist 
      };
      this.eventoDataCreate = {
        ...this.eventoData, // Mantiene los valores anteriores
        nombre: this.eventForm.value.nombre,
        fecha: this.eventForm.value.fecha,
        lugar: this.eventForm.value.lugar,
        hora: `${this.eventForm.value.hora}:00`,
        tipoID: this.eventForm.value.tipoID,
        categorias: this.categorias,
        eventoDistancias: this.evDist 
      };
      console.log("id del evento ",this.id)
      if(this.id){
        
        //actualizar imagen
        console.log('Datos del evento actualizado:', this.eventoDataUpdate);
        this._eventoService.updateEvento(this.id, this.eventoDataUpdate).subscribe(() => {

          if (this.eventForm.value.imagen!==null){
            this.updateImagen(this.id)
          }
          this.isEditing = false; // Volver a modo solo lectura
          this.obtenerEvento();
        });
      } else{
        console.log('Datos del evento creado:', this.eventoDataCreate);
        this._eventoService.createEvento(this.eventoDataCreate).subscribe((id) => {
          this.id=id;
          this.updateImagen(id);
          
          this.isEditing = false; // Volver a modo solo lectura
          
          this.obtenerEvento();
        });
      }
      
    } else {
      this.eventForm.markAllAsTouched();
      
    }
  }
  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
  updateImagen(id:any){
    debugger;
    this._eventoService.updateImagen(id,this.eventForm.value.imagen).subscribe({
      next:response => this.snackBar.open('Evento actualizado exitosamente', 'Cerrar', {
        duration: 400,
      }),
      error: err => console.error('error al subir la imagen',err)
    });
  }
  isFieldInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
