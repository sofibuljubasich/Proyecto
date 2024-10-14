using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace BE.Models
{
    public class Usuario
    {
        public int ID { get; set; } 
        public string Email { get; set; }

        public string Password { get; set; } 

        public string Nombre { get; set; } 

        public string Apellido { get; set; } 

//        public byte[]? Imagen { get; set; }
        public string? Imagen { get; set; }


        public string Telefono { get; set; }

       

        [ForeignKey("Rol")]
        public int RolID { get; set; }
        public virtual Rol? Rol { get; set; }
        public string? ConfirmationToken { get; set; }
        public Boolean ConfirmedEmail { get; set; }

        // Campos adicionales para recuperación de contraseña
        public string? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTokenExpires { get; set; }



    }
}