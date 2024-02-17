using BE.Models;

namespace BE.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<List<Usuario>> GetUsuarios(); // SOLO LOS ADMIN ACCEDEN

        Task<Usuario> GetUsuario(string email);

        Task<Usuario> CreateUsuario(Usuario usuario); // CREAR USUARIO TIPO CORREDOR

        Task UpdateUsuario(Usuario usuario);

        Task DeleteInscripcion(Usuario usuario);
        bool CheckIfUserExists(string email);
        Usuario? Validate(string userEmail, string password);
    }
}
