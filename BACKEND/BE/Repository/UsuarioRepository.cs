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

     

        // Ver si poner un string
        public bool CheckIfUserExists(string userCorreo)
        {
            Usuario? user = _context.Usuarios.FirstOrDefault(user => user.Email == userCorreo);
            return user != null;
        }

        public async Task<List<Usuario>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario> GetUsuario(string email)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(x => x.Email == email);
           
        }

        public async Task<Usuario> CreateUsuario(Usuario usuario)
        {
            _context.Add(usuario);

            await _context.SaveChangesAsync();
            return usuario;
        }

        public Task UpdateUsuario(Usuario usuario)
        {
            throw new NotImplementedException();
        }

        public Task DeleteInscripcion(Usuario usuario)
        {
            throw new NotImplementedException();
        }

        public Usuario? Validate(string userEmail, string password)
        {
            return _context.Usuarios.SingleOrDefault(x => x.Email == userEmail && x.Password == password);

        }
    }
}
