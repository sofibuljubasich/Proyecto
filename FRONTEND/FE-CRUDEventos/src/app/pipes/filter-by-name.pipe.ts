import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(chats: any[], searchText: string): any[] {
    if (!chats || !searchText) {
      return chats;
    }
    // Convertir el texto a minúsculas para hacer la búsqueda no sensible a mayúsculas
    searchText = searchText.toLowerCase();
    return chats.filter(
      (chat) =>
        chat.destinatario.nombre.toLowerCase().includes(searchText) ||
        chat.destinatario.apellido.toLowerCase().includes(searchText)
    );
  }
}
