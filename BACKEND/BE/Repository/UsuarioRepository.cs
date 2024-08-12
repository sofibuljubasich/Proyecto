using BE.Interfaces;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly EventosContext _context;

        public UsuarioRepository(EventosContext context)
        {
            _context = context;
        }

        public async Task ConfirmEmailAsync(string email, string token)
        {
            var user = _context.Usuarios.SingleOrDefault(u => u.Email == email && u.ConfirmationToken == token);


            user.ConfirmedEmail = true;
               
                
            
            
            await _context.SaveChangesAsync();
        }

        // Ver si poner un string
        public bool CheckIfUserExists(string userCorreo)
        {
            Usuario? user = _context.Usuarios.FirstOrDefault(user => user.Email == userCorreo);
            return user != null;
        }

        public async Task<List<Usuario>> GetUsuarios()
        {
           return await  _context.Usuarios
                .Include(u => u.Rol)
                .ToListAsync();

//return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario> GetUsuarioByEmail(string email)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(x => x.Email == email);
           
        }

     

        public async Task UpdateUsuario(Usuario usuario)
        {
            var usuarioItem = await _context.Usuarios.FirstOrDefaultAsync(x => x.ID == usuario.ID);

            if (usuarioItem != null)
            {
                usuarioItem.Nombre = usuario.Nombre;
                usuarioItem.Apellido = usuario.Apellido;
                usuarioItem.Email = usuario.Email;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteUsuario(Usuario usuario)
        {
            _context.Remove(usuario);
            await _context.SaveChangesAsync();
           
        }

        public Usuario? Validate(string userEmail, string password)
        {
            return _context.Usuarios.SingleOrDefault(x => x.Email == userEmail && x.Password == password);

        }

        public async Task<Usuario> CreateUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();
            return usuario;
        }

       

        public async Task<Usuario> GetUsuario(int usuarioID)
        {
            return await _context.Usuarios.Include(x=>x.Rol).FirstOrDefaultAsync(x=>x.ID == usuarioID);
        }
        public async Task<Corredor> GetCorredor(int corredorID)
        {
            return await _context.Corredores.Include(x => x.Rol).FirstOrDefaultAsync(x => x.ID == corredorID);
                
        }

        public async   Task<string> RequestPasswordResetAsync(string email)
        {
            var user = _context.Usuarios.SingleOrDefault(u => u.Email == email);
            if (user == null)
            {
                throw new Exception("El usuario no existe.");
            }

            // Generar un token de restablecimiento de contraseña
            user.PasswordResetToken = Guid.NewGuid().ToString();
            user.PasswordResetTokenExpires = DateTime.UtcNow.AddHours(1); // El token expira en 1 hora

            _context.Usuarios.Update(user);
            await _context.SaveChangesAsync();

            return user.PasswordResetToken;

         
        }

    

    public async Task ResetPasswordAsync(string email, string token, string newPassword)
        {
        var user = _context.Usuarios.SingleOrDefault(u => u.Email == email && u.PasswordResetToken == token);

        if (user == null || user.PasswordResetTokenExpires < DateTime.UtcNow)
        {
            throw new Exception("El token de restablecimiento es inválido o ha expirado.");
        }

        // Hashear la nueva contraseña
        user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);

        // Limpiar el token de restablecimiento
        user.PasswordResetToken = null;
        user.PasswordResetTokenExpires = null;

        _context.Usuarios.Update(user);
        await _context.SaveChangesAsync();
    }
    }
}
