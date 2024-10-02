using BE.Models;

namespace BE.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<string>
            RequestPasswordResetAsync(string email);

        Task ResetPasswordAsync(string email, string token, string newPassword);
        Task ConfirmEmailAsync(string email, string token);
        Task<List<Usuario>> GetUsuarios(); // SOLO LOS ADMIN ACCEDEN

        Task<Usuario> GetUsuarioByEmail(string email);

        Task<Usuario> GetUsuario(int usuarioID);
        Task<Corredor> GetCorredor(int coCorredorID);    

        
        Task<Usuario> CreateUsuario(Usuario usuario); 

      
        Task UpdateUsuario(Usuario usuario);

        Task DeleteUsuario(Usuario usuario);
        bool CheckIfUserExists(string email);
        Usuario? Validate(string userEmail, string password);
        Task ChangePasswordAsync(string email, string newPasswordHash);
    }
}
