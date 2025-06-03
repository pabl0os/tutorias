<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Gestión de Usuarios</title>
    <link rel="stylesheet" href="proyectoGestionProyectosSoftware/styles/usuarios.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <header class="navbar">
        <h1>Gestión de Usuarios</h1>
    </header>

    <main class="table-container">
        <!-- Controles superiores -->
        <div class="search-controls">
            <input type="text" id="search-bar" placeholder="Buscar usuarios..." />
            <button class="icon-button" id="filter-button">
                <img src="proyectoGestionProyectosSoftware/icons/botones/filtrar.svg" alt="Filtrar" />
            </button>
            <button class="icon-button" id="options-button">
                <img src="proyectoGestionProyectosSoftware/icons/botones/puntos.svg" alt="Opciones" />
            </button>

            <!-- Menú desplegable -->
            <div class="dropdown-menu" id="dropdown-menu">
                <button class="dropdown-item" id="download-reports">Descargar todos los reportes</button>
                <button class="dropdown-item" id="delete-reports">Borrar todos los reportes</button>
            </div>
        </div>

        <!-- Botón "Agregar" -->
        <div class="add-button-container">
            <button class="add-button" id="add-button">Agregar</button>
        </div>

        <!-- Contenedor para la tabla -->
        <div id="table-content"></div>
    </main>

    
    @php
        $rol = session('usuario')->Rol ?? '';
        $areas = session('usuario')->areas ?? [];
    @endphp

    <!-- Ventana de diálogo -->
    <div class="dialog-overlay" id="filter-dialog">
        <div class="dialog">
            <h2>Filtrar Usuarios</h2>
            <div class="dialog-content">
                <div class="filter-columns">
                    @if($rol === 'coordinador institucional')
                        <!-- Solo columna de Carrera, muestra todas las opciones -->
                        <div class="filter-column">
                            <h3>Carrera</h3>
                            <div class="radio-group">
                                <label><input type="radio" name="carrera" value="industrial" /> Industrial</label>
                                <label><input type="radio" name="carrera" value="sistemas" /> Sistemas</label>
                                <label><input type="radio" name="carrera" value="tic" /> TIC</label>
                                <label><input type="radio" name="carrera" value="gestion" /> Gestión</label>
                                <label><input type="radio" name="carrera" value="electronica" /> Electrónica</label>
                                <label><input type="radio" name="carrera" value="electromecanica" /> Electromecánica</label>
                                <label><input type="radio" name="carrera" value="mecatronica" /> Mecatrónica</label>
                                <label><input type="radio" name="carrera" value="logistica" /> Logística</label>
                            </div>
                        </div>
                    @elseif($rol === 'coordinador departamental')
                        <!-- Solo columna de Carrera, solo las áreas de adscripción del usuario -->
                        <div class="filter-column">
                            <h3>Carrera</h3>
                            <div class="radio-group">
                                @foreach($areas as $area)
                                    <label>
                                        <input type="radio" name="carrera" value="{{ strtolower(str_replace([' ', 'á', 'é', 'í', 'ó', 'ú', 'ñ'], ['_', 'a', 'e', 'i', 'o', 'u', 'n'], $area)) }}" />
                                        {{ $area }}
                                    </label>
                                @endforeach
                            </div>
                        </div>
                    @else
                        <!-- Otros roles: muestra ambas columnas como antes -->
                        <!-- Columna de "Tipo" -->
                        <div class="filter-column">
                            <h3>Tipo</h3>
                            <div class="radio-group">
                                <label><input type="radio" name="tipo" value="institucional" /> Institucional</label>
                                <label><input type="radio" name="tipo" value="departamento" /> Departamento</label>
                                <label><input type="radio" name="tipo" value="tutores" /> Tutores</label>
                            </div>
                        </div>
                        <!-- Columna de "Carrera" -->
                        <div class="filter-column">
                            <h3>Carrera</h3>
                            <div class="radio-group">
                                <label><input type="radio" name="carrera" value="industrial" /> Industrial</label>
                                <label><input type="radio" name="carrera" value="sistemas" /> Sistemas</label>
                                <label><input type="radio" name="carrera" value="tic" /> TIC</label>
                                <label><input type="radio" name="carrera" value="gestion" /> Gestión</label>
                                <label><input type="radio" name="carrera" value="electronica" /> Electrónica</label>
                                <label><input type="radio" name="carrera" value="electromecanica" /> Electromecánica</label>
                                <label><input type="radio" name="carrera" value="mecatronica" /> Mecatrónica</label>
                                <label><input type="radio" name="carrera" value="logistica" /> Logística</label>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
            <div class="dialog-actions">
                <button class="dialog-button" id="close-dialog">Cerrar</button>
            </div>
        </div>
    </div>

    <!-- Ventana de diálogo para registrar usuario -->
    <div class="dialog-overlay" id="add-user-dialog">
        <div class="dialog">
            <h2>Registrar Usuario</h2>
            <div class="dialog-content">
                <form id="add-user-form">
                    <!-- Campo para el nombre -->
                    <div class="form-group">
                        <label for="user-name">Nombre</label>
                        <input type="text" id="user-name" name="user-name" placeholder="Ingrese el nombre" required />
                    </div>

                    <!-- Campo para el correo -->
                    <div class="form-group">
                        <label for="user-email">Correo</label>
                        <input type="email" id="user-email" name="user-email" placeholder="Ingrese el correo"
                            required />
                    </div>

                    <!-- Lista desplegable para la carrera -->
                    <div class="form-group" id="career-group">
                        <label for="user-career">Carrera</label>
                        <select id="user-career" name="user-career" required>
                            <option value="" disabled selected>Seleccione una carrera</option>
                            <option value="industrial">Industrial</option>
                            <option value="sistemas">Sistemas</option>
                            <option value="tic">TIC</option>
                            <option value="gestion">Gestión</option>
                            <option value="electronica">Electrónica</option>
                            <option value="electromecanica">Electromecánica</option>
                            <option value="mecatronica">Mecatrónica</option>
                            <option value="logistica">Logística</option>
                        </select>
                    </div>

                    <!-- Lista desplegable para el rol -->
                    <div class="form-group">
                        <label for="user-role">Rol</label>
                        <select id="user-role" name="user-role" required>
                            <option value="" disabled selected>Seleccione un rol</option>
                            <option value="administrador">Administrador</option>
                            <option value="coordinador institucional">Coordinador Institucional</option>
                            <option value="coordinador departamental">Coordinador Departamental</option>
                            <option value="tutor">Tutor</option>
                        </select>
                    </div>

                    <!-- Campo para la contraseña -->
                    <div class="form-group">
                        <label for="user-password">Contraseña</label>
                        <input type="password" id="user-password" name="user-password" placeholder="Ingrese la contraseña" required />
                    </div>
                </form>
            </div>
            <div class="dialog-actions">
                <button class="dialog-button" id="add-user-submit">Agregar</button>
                <button class="dialog-button cancel-button" id="add-user-cancel">Cancelar</button>
            </div>
        </div>
    </div>

    <!-- Diálogo de confirmación para eliminar usuario
    <dialog id="delete-user-dialog">
        <form method="dialog">
            <h3>¿Estás seguro de eliminar este usuario?</h3>
            <div class="dialog-actions">
                <button id="confirm-delete" type="button">Eliminar</button>
                <button id="cancel-delete" type="button">Cancelar</button>
            </div>
        </form>
    </dialog> -->

    <script src="proyectoGestionProyectosSoftware/controller/usuarios.js"></script>
    <script>
        window.usuarios = {!! $usuariosJson ?? '[]' !!};
    </script>
</body>

</html>