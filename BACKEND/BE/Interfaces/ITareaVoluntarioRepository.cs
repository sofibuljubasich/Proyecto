﻿using BE.Models;

namespace BE.Interfaces
{
    public interface ITareaVoluntarioRepository
    {

        Task<TareaVoluntario> Get(int tareaID, int voluntarioID);
        Task CreateTareaVoluntario(int tareaID, List<Voluntario> voluntarios);

        Task<List<Voluntario>> GetVoluntariosByTarea(int tareaID);

        Task<List<Tarea>> GetTareasByVoluntario(int voluntarioID);
        Task<List<Tarea>> GetTareasByEventoVoluntario(int eventoID, int voluntarioID);

        Task DeleteTareasByVoluntario(TareaVoluntario tareaVoluntario);

        Task AddComentario(TareaVoluntario tareaVoluntario);

        Task AddEstado(TareaVoluntario tareaVoluntario);

        Task RemoveVoluntarios(List<Voluntario> voluntarios);
        
        Task AddVoluntario(int TareaID, int voluntarioID);  
        //Actualizar

        // Comentaro

        //Estado


    }
}
