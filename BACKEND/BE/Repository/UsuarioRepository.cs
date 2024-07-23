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
            return await _context.Usuarios.FirstOrDefaultAsync(x=>x.ID == usuarioID);
        }
        public async Task<Corredor> GetCorredor(int corredorID)
        {
            return await _context.Corredores.FirstOrDefaultAsync(x => x.ID == corredorID);
                
        }


    }
}
