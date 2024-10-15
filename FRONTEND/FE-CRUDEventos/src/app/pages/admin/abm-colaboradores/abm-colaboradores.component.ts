import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ComentarioNuevo } from 'src/app/interfaces/comentario';
import { General, UsuarioEnviado } from 'src/app/interfaces/usuario';
import { Inscrito } from 'src/app/interfaces/usuario';
import { EventoService } from 'src/app/services/evento.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserService } from 'src/app/services/user.service';
import { VoluntarioService } from 'src/app/services/voluntario.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../../sign-up/sign-up.component';

@Component({
  selector: 'app-abm-colaboradores',
  templateUrl: './abm-colaboradores.component.html',
  styleUrl: './abm-colaboradores.component.css',
})
export class AbmColaboradoresComponent {
  eventoId!: number;
  mostrarFormulario = false;
  altaForm!: FormGroup;
  errorMessage: string | null = null;
  showError: boolean = false;
  nuevoid:number=0;

  // resultados: TablaResultados[] = [];
  displayedColumns: string[] = ['nro', 'nombre', 'email', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private aRoute: ActivatedRoute,
    private _userService: UserService,
    private fb: FormBuilder,
    private _volService: VoluntarioService,
    private location: Location,
    private dialog: MatDialog,
  ) {
    this.eventoId = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getColaboradores();
    this.altaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      telefono: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', [Validators.required]],
    });
  }
  getColaboradores(): void {
    this._userService.getUsuarios().subscribe((data: General[]) => {
      const transformedData = data
      .filter(voluntario => voluntario.rolID !== 1 && voluntario.rolID !== 2) // Filtra los voluntarios con rolID diferente de 2
      .map((voluntario, index) => ({
        id: voluntario.id,
        nro: index + 1, // Número de orden
        email: voluntario.email, // Email del voluntario
        nombre: `${voluntario.nombre} ${voluntario.apellido}`, // Nombre completo
        rol: voluntario.rolID // ID del rol
      }));
      this.nuevoid=transformedData.length
      console.log(transformedData)
      this.dataSource.data = transformedData;
    });
  }
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregar(): void {
    if (this.altaForm.valid) {
      const nuevoColaborador = new FormData();
      nuevoColaborador.append('nombre', this.altaForm.value.nombre);
      nuevoColaborador.append('apellido', this.altaForm.value.apellido);
      nuevoColaborador.append('telefono', this.altaForm.value.telefono);
      nuevoColaborador.append('email', this.altaForm.value.email);
      nuevoColaborador.append('password', this.altaForm.value.password);
      nuevoColaborador.append('rolID', this.altaForm.value.rol);
      if (this.altaForm.value.rol == 3) {
        this._volService.register(nuevoColaborador).subscribe(
          (response:any) => {
              console.log(response)
              const nuevoUsuario: any = {
                  id: response.id,
                  nro: this.dataSource.data.length + 1,
                  email: response.email,
                  nombre: `${response.nombre} ${response.apellido}`,
                  rol: response.rolID
                }
              console.log(nuevoUsuario)
              this.dataSource.data = [...this.dataSource.data, nuevoUsuario];
          }
        ) 
      } else {
        this._userService.agregarUsuarios(nuevoColaborador).subscribe(
          (response:any) => {
              const nuevoUsuario: any = {
                id: response.id,
                nro: this.dataSource.data.length + 1,
                email: response.email,
                nombre: `${response.nombre} ${response.apellido}`,
                rol: response.rolID
              };
              console.log(nuevoUsuario)
              this.dataSource.data = [...this.dataSource.data, nuevoUsuario];
          }
        )
      }
      
      this.getColaboradores;
      this.altaForm.reset();
      this.toggleFormulario();
      this.errorMessage = null;
    }
  }


  goBack(): void {
    this.location.back();
  }

  onRolChange(element: any): void {
    const updatedEstado = element.rol == 3 ? 3 : 4;
    console.log(element);
    const usuarioID = element.id;
    const rolID = element.rol;
  
    this._userService.updateRol(usuarioID, rolID).subscribe(
      response => {
        console.log('Rol actualizado:', response);
        // Aquí puedes manejar cualquier lógica adicional, como mostrar un mensaje de éxito
      },
      error => {
        console.error('Error al actualizar rol:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    );
  }

  delete(element: any) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
