<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Filtrar grupos</title>
    <link rel="stylesheet" href="proyectoGestionProyectosSoftware/styles/departamental.css">
</head>

<body>
    <header class="navbar">
        <h1>Filtrar Grupos</h1>
    </header>

    <main class="tabs-container">
        <!-- Contenedor para las pestañas -->
        <div class="tabs"></div>

        <!-- Contenedor para el contenido dinámico -->
        <div id="tab-content"></div>

        <!-- Formato reporte semestral Coordinador departamental -->
        <iframe src="/Formato-reporte-semestral-Coordinador-departamental"
            style="width: 100%; min-height: 800px; border: none; margin-top: 20px;  zoom: 0.8"
            title="Formato reporte semestral Coordinador departamental" id="formato-reporte-semestral-iframe">
        </iframe>
    </main>

    <script src="../controller/departamental.js"></script>
</body>

</html>