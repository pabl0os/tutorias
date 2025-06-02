<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Usuarios Ver</title>
    <link rel="stylesheet" href="proyectoGestionProyectosSoftware/styles/usuarios-ver.css">
</head>

<body>
    <div class="container">
        <div class="left-container">
            <!-- <button class="delete-button">
                <img src="../icons/botones/eliminar.svg" alt="Icono Eliminar" />
            </button> -->
            <button class="icon-button" id="btn-atra">
                <img src="proyectoGestionProyectosSoftware/icons/botones/atra.svg" alt="Icono Atra" />
            </button>
            <div class="main-content">
                <h1>Usuarios</h1>
            </div>

            <!-- Sección de pestañas para cambiar la tabla -->
            <div class="tabs">
                <button class="tab active" data-group="1">Grupo Uno</button>
                <button class="tab" data-group="2">Grupo Dos</button>
            </div>
            <div class="sub-tabs">
                <button class="sub-tab active" data-subtab="formato">Formato principal</button>
                <button class="sub-tab" data-subtab="desempeno">Nivel de desempeño</button>
            </div>
            <div id="table-container">
            </div>
        </div>
        <div class="sidebar closed" id="sidebar">
            <div class="sidebar-tab" id="sidebar-tab">
                <span>&#9776;</span>
            </div>
            <div class="sidebar-content">
                <!-- Ícono de editar -->
                <button class="edit-button" id="edit-button">
                    <img src="proyectoGestionProyectosSoftware/icons/botones/editar.svg" alt="Editar">
                </button>

                <!-- Información del usuario -->
                <div class="user-info">
                    <div class="user-field">
                        <strong>Nombre:</strong> <span id="user-name">Juan Pérez</span>
                    </div>
                    <div class="user-field">
                        <strong>Correo:</strong> <span id="user-email">juan.perez@example.com</span>
                    </div>
                    <div class="user-field">
                        <strong>Área de Adscripción:</strong> <span id="user-area">Recursos Humanos</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Diálogo para editar información -->
    <dialog id="edit-dialog">
        <form id="edit-user-form" method="dialog">
            <h3>Editar Información del Usuario</h3>
            <label for="edit-name">Nombre:</label>
            <input type="text" id="edit-name" name="edit-name" value="Juan Pérez">
            <label for="edit-email">Correo:</label>
            <input type="email" id="edit-email" name="edit-email" value="juan.perez@example.com">
            <label for="edit-area">Área de Adscripción:</label>
            <input type="text" id="edit-area" name="edit-area" value="Recursos Humanos">
            <div class="dialog-actions">
                <button type="submit">Guardar</button>
                <button type="button" id="close-dialog">Cancelar</button>
            </div>
        </form>
    </dialog>
    <script src="proyectoGestionProyectosSoftware/controller/usuarios-ver.js"></script>
</body>

</html>