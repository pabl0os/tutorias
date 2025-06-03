<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página con Navbar y Sidebar</title>
    <link rel="stylesheet" href="{{ asset('proyectoGestionProyectosSoftware/styles/estilos.css') }}">
</head>

<body>
    <!-- Barra superior -->
    <header class="navbar">
        <div class="navbar-logos">
            <img src="{{ asset('proyectoGestionProyectosSoftware/images/pleca_tecnm.jpg') }}" alt="Logo TecNM" class="logo">
            <img src="{{ asset('proyectoGestionProyectosSoftware/images/logo_itl.png') }}" alt="Logo ITL" class="logo">
            <img src="{{ asset('proyectoGestionProyectosSoftware/images/logo96x96.png') }}" alt="Logo ITL" class="logo">
        </div>
        <div class="profile-menu">
            <img src="{{ asset('proyectoGestionProyectosSoftware/icons/perfil.svg') }}" alt="Icono Perfil" class="profile-icon">
            <div class="profile-dropdown">
                <iframe src="{{ url('perfil') }}" frameborder="0" style="width: 100%; height: 100%;"></iframe>
            </div>
        </div>
    </header>

    <!-- Contenedor principal -->
    <div class="container">
        <!-- Barra lateral con menú -->
        <nav class="sidebar">
            <ul class="menu">
                @php
                    $rol = session('usuario')->Rol ?? '';
                @endphp

                @if($rol === 'coordinador institucional')
                    <li class="menu-item" data-url="{{ url('institucional') }}">
                        <img src="{{ asset('proyectoGestionProyectosSoftware/icons/institucional.svg') }}" alt="Icono institucional" class="menu-icon">
                    </li>
                @elseif($rol === 'coordinador departamental')
                    <li class="menu-item" data-url="{{ url('departamental') }}">
                        <img src="{{ asset('proyectoGestionProyectosSoftware/icons/departamental.svg') }}" alt="Icono departamental" class="menu-icon">
                    </li>
                @elseif($rol === 'tutor')
                    <li class="menu-item" data-url="{{ url('tutor') }}">
                        <img src="{{ asset('proyectoGestionProyectosSoftware/icons/tutor.svg') }}" alt="Icono tutor" class="menu-icon">
                    </li>
                @endif

                  @if($rol === 'administrador' || $rol === 'coordinador institucional' || $rol === 'coordinador departamental')
                    <li class="menu-item" data-url="{{ url('usuarios') }}">
                        <img src="{{ asset('proyectoGestionProyectosSoftware/icons/usuarios.svg') }}" alt="Icono usuarios" class="menu-icon">
                    </li>
                @endif
            </ul>
        </nav>

        <!-- Contenido principal con iframe -->
        <main class="content">
            <iframe src="{{ url('perfil') }}" name="contenido" frameborder="0" style="width: 100%; height: 100%;"></iframe>
        </main>
    </div>

    <script src="{{ asset('proyectoGestionProyectosSoftware/controller/script.js') }}"></script>
</body>
</html>