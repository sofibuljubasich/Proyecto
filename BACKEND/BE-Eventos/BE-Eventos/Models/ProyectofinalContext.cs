using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BE_Eventos.Models;

public partial class ProyectofinalContext : DbContext
{
    public ProyectofinalContext()
    {
    }

    public ProyectofinalContext(DbContextOptions<ProyectofinalContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CategoriaEvento> CategoriaEventos { get; set; }

    public virtual DbSet<Categorium> Categoria { get; set; }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<DistanciaEvento> DistanciaEventos { get; set; }

    public virtual DbSet<Distancium> Distancia { get; set; }

    public virtual DbSet<Evento> Eventos { get; set; }

    public virtual DbSet<Inscripcion> Inscripcions { get; set; }

    public virtual DbSet<Mensaje> Mensajes { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Tarea> Tareas { get; set; }

    public virtual DbSet<TareaAtendidum> TareaAtendida { get; set; }

    public virtual DbSet<TipoEvento> TipoEventos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=proyectofinal;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CategoriaEvento>(entity =>
        {
            entity.HasKey(e => new { e.IdEvento, e.CodCategoria }).HasName("PK__categori__05191EBD93D27B11");

            entity.ToTable("categoria_evento");

            entity.Property(e => e.IdEvento).HasColumnName("idEvento");
            entity.Property(e => e.CodCategoria).HasColumnName("codCategoria");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");

            entity.HasOne(d => d.CodCategoriaNavigation).WithMany(p => p.CategoriaEventos)
                .HasForeignKey(d => d.CodCategoria)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_categoria_evento_categoria");

            entity.HasOne(d => d.IdEventoNavigation).WithMany(p => p.CategoriaEventos)
                .HasForeignKey(d => d.IdEvento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_categoria_evento_evento");
        });

        modelBuilder.Entity<Categorium>(entity =>
        {
            entity.HasKey(e => e.Idcategoria).HasName("PK__categori__140587C7BBFA94A6");

            entity.ToTable("categoria");

            entity.Property(e => e.Idcategoria)
                .ValueGeneratedNever()
                .HasColumnName("idcategoria");
            entity.Property(e => e.EdadFin).HasColumnName("edad_fin");
            entity.Property(e => e.EdadInicio).HasColumnName("edad_inicio");
        });

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.HasKey(e => new { e.CorreoCorredor, e.FechaHora, e.IdEvento }).HasName("PK__comentar__D4C0CB20AB71CA6A");

            entity.ToTable("comentario");

            entity.Property(e => e.CorreoCorredor)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("correo_corredor");
            entity.Property(e => e.FechaHora)
                .HasColumnType("datetime")
                .HasColumnName("fecha_hora");
            entity.Property(e => e.IdEvento).HasColumnName("idEvento");
            entity.Property(e => e.Contenido)
                .HasMaxLength(400)
                .IsUnicode(false)
                .HasColumnName("contenido");

            entity.HasOne(d => d.CorreoCorredorNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.CorreoCorredor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_comentario_corredor");

            entity.HasOne(d => d.IdEventoNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.IdEvento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_comentario_evento");
        });

        modelBuilder.Entity<DistanciaEvento>(entity =>
        {
            entity.HasKey(e => new { e.IdEvento, e.CodDistancia }).HasName("PK__distanci__9EF8D99008F9674A");

            entity.ToTable("distancia_evento");

            entity.Property(e => e.IdEvento).HasColumnName("idEvento");
            entity.Property(e => e.CodDistancia).HasColumnName("codDistancia");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Costo)
                .HasColumnType("decimal(2, 0)")
                .HasColumnName("costo");

            entity.HasOne(d => d.CodDistanciaNavigation).WithMany(p => p.DistanciaEventos)
                .HasForeignKey(d => d.CodDistancia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_distancia_evento_distancia");

            entity.HasOne(d => d.IdEventoNavigation).WithMany(p => p.DistanciaEventos)
                .HasForeignKey(d => d.IdEvento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_distancia_evento_evento");
        });

        modelBuilder.Entity<Distancium>(entity =>
        {
            entity.HasKey(e => e.Codigo).HasName("PK__distanci__40F9A20737D67CD2");

            entity.ToTable("distancia");

            entity.Property(e => e.Codigo)
                .ValueGeneratedNever()
                .HasColumnName("codigo");
            entity.Property(e => e.Km).HasColumnName("km");
        });

        modelBuilder.Entity<Evento>(entity =>
        {
            entity.HasKey(e => e.Idevento).HasName("PK__evento__C8A2BCFE806E7B65");

            entity.ToTable("evento");

            entity.Property(e => e.Idevento).HasColumnName("idevento");
            entity.Property(e => e.Estado)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasDefaultValueSql("('ACTIVO')")
                .HasColumnName("estado");
            entity.Property(e => e.Fecha)
                .HasColumnType("date")
                .HasColumnName("fecha");
            entity.Property(e => e.IdTipo).HasColumnName("idTipo");
            entity.Property(e => e.Imagen).HasColumnName("imagen");
            entity.Property(e => e.Lugar)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("lugar");
            entity.Property(e => e.Nombre)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Requisitos)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("requisitos");

            entity.HasOne(d => d.IdTipoNavigation).WithMany(p => p.Eventos)
                .HasForeignKey(d => d.IdTipo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_evento_tipo_eveto");
        });

        modelBuilder.Entity<Inscripcion>(entity =>
        {
            entity.HasKey(e => new { e.IdEvento, e.Correo }).HasName("PK__inscripc__7A79FD3AB910193E");

            entity.ToTable("inscripcion");

            entity.Property(e => e.IdEvento).HasColumnName("idEvento");
            entity.Property(e => e.Correo)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.CodDistancia).HasColumnName("cod_distancia");
            entity.Property(e => e.Dorsal).HasColumnName("dorsal");
            entity.Property(e => e.EstadoPago)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("estado_pago");
            entity.Property(e => e.Fecha)
                .HasColumnType("date")
                .HasColumnName("fecha");
            entity.Property(e => e.FormaPago)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("forma_pago");
            entity.Property(e => e.Posicion)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("posicion");
            entity.Property(e => e.TalleRemera)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("talle_remera");
            entity.Property(e => e.Tiempo).HasColumnName("tiempo");

            entity.HasOne(d => d.CodDistanciaNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.CodDistancia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_inscripcion_distancia");

            entity.HasOne(d => d.CorreoNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.Correo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_inscripcion_corredor");

            entity.HasOne(d => d.IdEventoNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.IdEvento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_inscripcion_evento");
        });

        modelBuilder.Entity<Mensaje>(entity =>
        {
            entity.HasKey(e => new { e.UsuarioEmisor, e.UsuarioReceptor }).HasName("PK__mensaje__C1644584937E0FDA");

            entity.ToTable("mensaje");

            entity.Property(e => e.UsuarioEmisor)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("usuario_emisor");
            entity.Property(e => e.UsuarioReceptor)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("usuario_receptor");
            entity.Property(e => e.Contenido)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("contenido");
            entity.Property(e => e.ContraseñaReceptor)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("contraseña_receptor");
            entity.Property(e => e.FechaHora).HasColumnName("fecha_hora");

            entity.HasOne(d => d.UsuarioEmisorNavigation).WithMany(p => p.MensajeUsuarioEmisorNavigations)
                .HasForeignKey(d => d.UsuarioEmisor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_mensaje_emisor");

            entity.HasOne(d => d.UsuarioReceptorNavigation).WithMany(p => p.MensajeUsuarioReceptorNavigations)
                .HasForeignKey(d => d.UsuarioReceptor)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_mensaje_receptor");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.CodRol).HasName("PK__rol__984C6140BB0EE554");

            entity.ToTable("rol");

            entity.HasIndex(e => e.CodRol, "codRol_UNIQUE").IsUnique();

            entity.Property(e => e.CodRol)
                .ValueGeneratedNever()
                .HasColumnName("codRol");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("descripcion");
        });

        modelBuilder.Entity<Tarea>(entity =>
        {
            entity.HasKey(e => e.CodTarea).HasName("PK__tarea__EC8E75395D11DB0A");

            entity.ToTable("tarea");

            entity.Property(e => e.CodTarea)
                .ValueGeneratedNever()
                .HasColumnName("cod_tarea");
            entity.Property(e => e.CorreoOrg)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("correo_org");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaHora)
                .HasColumnType("datetime")
                .HasColumnName("fecha_hora");
            entity.Property(e => e.Ubicacion)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("ubicacion");

            entity.HasOne(d => d.CorreoOrgNavigation).WithMany(p => p.Tareas)
                .HasForeignKey(d => d.CorreoOrg)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_tarea_organizador");
        });

        modelBuilder.Entity<TareaAtendidum>(entity =>
        {
            entity.HasKey(e => new { e.CorreoVoluntario, e.CodTarea }).HasName("PK__tarea_at__2D76D25FEB827292");

            entity.ToTable("tarea_atendida");

            entity.Property(e => e.CorreoVoluntario)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("correo_voluntario");
            entity.Property(e => e.CodTarea).HasColumnName("cod_tarea");
            entity.Property(e => e.Comentarios)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("comentarios");
            entity.Property(e => e.Estado)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasDefaultValueSql("('no completada')")
                .HasColumnName("estado");

            entity.HasOne(d => d.CodTareaNavigation).WithMany(p => p.TareaAtendida)
                .HasForeignKey(d => d.CodTarea)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_atendida_tarea");

            entity.HasOne(d => d.CorreoVoluntarioNavigation).WithMany(p => p.TareaAtendida)
                .HasForeignKey(d => d.CorreoVoluntario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_atendida_voluntario");
        });

        modelBuilder.Entity<TipoEvento>(entity =>
        {
            entity.HasKey(e => e.Codigo).HasName("PK__tipo_eve__40F9A20781B1052C");

            entity.ToTable("tipo_evento");

            entity.HasIndex(e => e.Codigo, "cod_UNIQUE").IsUnique();

            entity.Property(e => e.Codigo).HasColumnName("codigo");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("descripcion");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Correo).HasName("PK__usuario__2A586E0A343E9442");

            entity.ToTable("usuario");

            entity.Property(e => e.Correo)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Apellido)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.CodRol).HasColumnName("codRol");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.Dni)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("dni");
            entity.Property(e => e.FechaNac)
                .HasColumnType("date")
                .HasColumnName("fecha_nac");
            entity.Property(e => e.Genero)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("genero");
            entity.Property(e => e.Imagen).HasColumnName("imagen");
            entity.Property(e => e.Localidad)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("localidad");
            entity.Property(e => e.Nombre)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.ObraSocial)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("obra_social");
            entity.Property(e => e.Telefono)
                .HasMaxLength(45)
                .IsUnicode(false)
                .HasColumnName("telefono");

            entity.HasOne(d => d.CodRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.CodRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_usuario_rol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
