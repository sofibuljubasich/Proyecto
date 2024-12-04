import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../services/evento.service';
import { EventoData, EventoResponse, Tipo } from 'src/app/interfaces/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaResponse } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { DistanciaResponse } from 'src/app/interfaces/distancia';
import { DistanciaService } from 'src/app/services/distancia.service';

@Component({
  selector: 'app-agregar-editar-evento',
  templateUrl: './agregar-editar-evento.component.html',
  styleUrls: ['./agregar-editar-evento.component.css'],
})
export class AgregarEditarEventoComponent implements OnInit {
  eventForm: FormGroup;
  isEditing: boolean = false;
  id: number;
  imagenURL: string| null = null;
  currentEvent!: EventoResponse;
  selectedFile?: File;
  selectedFileUrl: string | null = null;
  categorias: CategoriaResponse[] = [];
  tipos: Tipo[] = [];
  dist: DistanciaResponse[] = [];
  distancias: any[] = [];
  cat: any[] = [];
  
  eventoData: EventoData = {
    userEmail: '',         // Correo electrónico vacío
    password: '',          // Contraseña vacía
    nombre: '',            // Nombre del evento vacío
    fecha: '',             // Fecha vacía (puede ser un string vacío o null dependiendo de tu caso de uso)
    lugar: '',             // Lugar vacío
    hora: '',              // Hora vacía
    eventoCategorias: [],
    eventoDistancias: [],
    tipoID: null          // tipoID vacío o null
  };
  categoriaSeleccionada: { [key: number]: number } = {};
  selectedCategoryId: number = 0;

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
    private datePipe: DatePipe
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      lugar: ['', Validators.required],
      estado: ['', Validators.required],
      tipoID: ['', Validators.required],
      imagen: [null],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerEvento();
    this.getDist();
    this.obtenerTipo();
    console.log(this.eventForm.value.imagen)
  }
  selectTipo(tipo: string) {
    this.eventForm.get('tipo')?.setValue(tipo); // Establece el valor seleccionado
  }
  obtenerCategorias() {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.cat = data;
    });
  }

  getDist() {
    this.distanciaService.getDistancias().subscribe((data) => {
      this.dist = data;
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
        (this.currentEvent = data),
          this.eventForm.patchValue({
            nombre: data.evento.nombre,
            fecha: data.evento.fecha.toString().split('T')[0], // Convertimos a formato ISO y extraemos solo la fecha
            hora: data.evento.toString().slice(0, 5), // Extraemos solo la hora (hh:mm)
            lugar: data.evento.lugar,
            estado: data.evento.estado,
            tipoID: data.evento.tipo.id
            // Agrega otros campos según sea necesario
          });

        this.imagenURL= 'https://localhost:7296' + data.evento.imagen;
        this.categorias = data.categorias; // Cargamos las categorías del evento

        this.distancias = data.distancias;
        console.log(data.categorias.map((c: any) => c.id));

        // this.setDistancias(data.distancias);
        const distanciasFormArray = this.eventForm.get(
          'eventoDistancias'
        ) as any;
        this.distancias.forEach((distancia: any) => {
          distanciasFormArray.push(
            this.fb.group({
              distanciaID: [distancia.distanciaID],
              km: [distancia.km, Validators.required],
              precio: [distancia.precio, Validators.required],
            })
          );
        });
      });
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

  setDistancias(distancias: any[]): void {
    const distanciaFGs = distancias.map((eventoDistancias) =>
      this.fb.group(eventoDistancias)
    );
    const distanciaFormArray = this.fb.array(distanciaFGs);
    this.eventForm.setControl('eventoDistancias', distanciaFormArray);
  }


  addCategoria(): void {
    // Busca la categoría seleccionada en la lista `cat`
    const categoriaSeleccionada = this.cat.find(
      (c) => c.id === this.selectedCategoryId
    );
    if (categoriaSeleccionada) {
      console.log('Categoría seleccionada:', categoriaSeleccionada);

      // Lógica para agregar la categoría
      this.categorias.push(categoriaSeleccionada);
    } else {
      console.error('Categoría no encontrada.');
    }
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    console.log('Fecha seleccionada:', selectedDate);
    // Actualizar el valor del formulario si es necesario
    this.eventForm.patchValue({ fecha: selectedDate });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventoData = {
        ...this.eventoData, // Mantiene los valores anteriores
        nombre: this.eventForm.value.nombre,
        fecha: this.eventForm.value.fecha,
        lugar: this.eventForm.value.lugar,
        hora: this.eventForm.value.hora,
        tipoID: this.eventForm.value.tipoID,
        // Asigna las categorías y distancias si es necesario
        // Si las categorías son parte del formulario
        eventoCategorias: this.categorias,
        eventoDistancias: this.distancias // Si las distancias son parte del formulario
      };
      if(this.id){
        
        //actualizar imagen
        console.log('Datos del evento:', this.eventoData);
        this._eventoService.updateEvento(this.id, this.eventoData).subscribe(() => {
          this.isEditing = false; // Volver a modo solo lectura
          this.obtenerEvento();
        });
      } else{
        this._eventoService.createEvento(this.eventoData).subscribe(() => {
          this.isEditing = false; // Volver a modo solo lectura
          this.obtenerEvento();
        });
      }
      
    } else {
      // revisar
      return;
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
}
