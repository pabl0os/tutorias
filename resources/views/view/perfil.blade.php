<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Perfil</title>
    <link rel="stylesheet" href="{{ asset('proyectoGestionProyectosSoftware/styles/perfil.css') }}">
</head>

<body>
    <header class="navbar">
        
    </header>

    <main class="profile-container">
        <div class="profile-info">
            <p><strong>Nombre:</strong> {{ session('usuario')->Nombre ?? '' }}</p>
            <p><strong>Correo:</strong> {{ session('usuario')->Correo ?? '' }}</p>
            <p><strong>Rol:</strong> {{ session('usuario')->Rol ?? '' }}</p>
            <p><strong>Área de adscripción:</strong>
                @if(!empty(session('usuario')->areas))
                    {{ implode(', ', session('usuario')->areas) }}
                @else
                    No asignada
                @endif
            </p>
        </div>
        <button class="logout-button" onclick="window.top.location.href='{{ url('logout') }}'">Salir</button>
    </main>
</body>

</html>