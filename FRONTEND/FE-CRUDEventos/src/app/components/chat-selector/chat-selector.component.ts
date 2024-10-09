import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrl: './chat-selector.component.css'
})
export class ChatSelectorComponent implements OnInit{
  personas:{id:number; nombre: string;apellido:string; foto: string }[] = []
  filteredPersonas = [...this.personas];
  searchTerm: string = '';
  baseUrl: string = `https://localhost:7296`;

  constructor(public dialogRef: MatDialogRef<ChatSelectorComponent>, private _userService:UserService,private router: Router) {}

  ngOnInit(){
    this._userService.getUsuarios().subscribe(
      (data: any[]) =>{
        console.log(data)
        this.personas= data.filter(usuario => usuario.rolID !== 1)
        .map(usuario => ({
          id:usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          foto: this.baseUrl + usuario.imagen,
        }));
        this.filteredPersonas=this.personas
      }
    )
  }

  filterPersonas() {
    this.filteredPersonas = this.personas.filter(persona =>
      persona.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  seleccionarPersona(persona: any) {
    this.dialogRef.close(); // Cierra el pop-up
    this.router.navigate(['/chat', persona.id]); // Navega a la página del chat
  }
  closeDialog() {
    this.dialogRef.close();
  }
  

}
