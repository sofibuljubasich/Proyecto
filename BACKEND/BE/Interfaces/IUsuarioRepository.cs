using BE.Models;

namespace BE.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<List<Usuario>> GetUsuarios(); // SOLO LOS ADMIN ACCEDEN

        Task<Usuario> GetUsuarioByEmail(string email);

        Task<Usuario> GetUsuario(int usuarioID);

        Task<Usuario> CreateUsuario(Usuario usuario); 

      
        Task UpdateUsuario(Usuario usuario);

        Task DeleteUsuario(Usuario usuario);
        bool CheckIfUserExists(string email);
        Usuario? Validate(string userEmail, string password);
    }
}
