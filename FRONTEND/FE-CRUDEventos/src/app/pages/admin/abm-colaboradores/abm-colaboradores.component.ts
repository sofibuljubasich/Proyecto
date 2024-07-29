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

@Component({
  selector: 'app-abm-colaboradores',
  templateUrl: './abm-colaboradores.component.html',
  styleUrl: './abm-colaboradores.component.css',
})
export class AbmColaboradoresComponent {
  eventoId!: number;
  mostrarFormulario = false;
  altaForm!: FormGroup;

  // resultados: TablaResultados[] = [];
  displayedColumns: string[] = ['nro', 'nombre', 'email', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private aRoute: ActivatedRoute,
    private _userService: UserService,
    private fb: FormBuilder,
    private _volService: VoluntarioService
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
    this._volService.getVoluntarios().subscribe((data: General[]) => {
      const transformedData = data.map((voluntario, index) => ({
        nro: index + 1,
        email: voluntario.email,
        nombre: voluntario.nombre + ' ' + voluntario.apellido,
        // rol: voluntario.rolID
        rol: '3',
      }));
      this.dataSource.data = transformedData;
    });
  }
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregar(): void {
    if (this.altaForm.valid) {
      const nuevoColaborador: UsuarioEnviado = {
        nombre: this.altaForm.value.nombre,
        apellido: this.altaForm.value.apellido,
        telefono: this.altaForm.value.telefono,
        email: this.altaForm.value.email,
        password: this.altaForm.value.password,
        rolID: this.altaForm.value.rol,
      };
      console.log(nuevoColaborador);
      if (this.altaForm.value.rol == 3) {
        this._volService.register(nuevoColaborador).subscribe(() => {
          const nuevo: UsuarioEnviado = {
            nombre:
              this.altaForm.value.nombre + ' ' + this.altaForm.value.apellido,
            email: this.altaForm.value.email,
            apellido: this.altaForm.value.apellido,
            telefono: this.altaForm.value.telefono,
            password: this.altaForm.value.password,
            rolID: this.altaForm.value.rol,
          };

          // Actualizar el DataSource
          this.dataSource.data = [...this.dataSource.data, nuevo];
        });
      } else {
        this._userService.agregarUsuarios(nuevoColaborador).subscribe(() => {
          const nuevo: UsuarioEnviado = {
            nombre:
              this.altaForm.value.nombre + ' ' + this.altaForm.value.apellido,
            email: this.altaForm.value.email,
            apellido: this.altaForm.value.apellido,
            telefono: this.altaForm.value.telefono,
            password: this.altaForm.value.password,
            rolID: this.altaForm.value.rol,
          };

          // Actualizar el DataSource
          this.dataSource.data = [...this.dataSource.data, nuevo];

          // Limpiar el formulario si es necesario
        });
      }
      this.getColaboradores;
      this.altaForm.reset();
      this.toggleFormulario();
    }
  }

  onRolChange(element: any): void {
    const updatedEstado = element.rol == 3 ? 3 : 4;
    console.log(updatedEstado);
    // this._inscripcionService
    //   .updateEstadoPago(element.id, updatedEstado)
    //   .subscribe(
    //     () => {
    //       console.log('Estado de pago actualizado');
    //     },
    //     (error) => {
    //       console.error('Error al actualizar estado de pago:', error);
    //     }
    //   );
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
