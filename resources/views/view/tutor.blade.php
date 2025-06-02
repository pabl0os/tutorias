
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Mis grupos</title>
    <link rel="stylesheet" href="{{ asset('proyectoGestionProyectosSoftware/styles/tutor.css') }}">
    <link rel="stylesheet" href="{{ asset('formatos/tuto/REPORTE DEL TUTOR_archivos/stylesheet.css') }}">
    <style>
        table {
            mso-displayed-decimal-separator: "\.";
            mso-displayed-thousand-separator: "\,";
        }

        @page {
            margin: .75in .24in .75in .24in;
            mso-header-margin: 0in;
            mso-footer-margin: 0in;
            mso-page-orientation: landscape;
        }
    </style>
</head>

<body>
    <main class="tabs-container">
        <!-- Contenedor para las pestañas -->
        <div class="tabs"></div>

        <!-- Contenedor para el contenido dinámico -->
        <div id="tab-content"></div>

        <!-- IFRAME para mostrar el reporte del tutor -->
        <!-- Si REPORTE-DEL-TUTOR.html es ahora una vista Blade, usa url('reporte-tutor') -->
        <!-- <iframe src="{{ url('reporte-tutor') }}"
            style="width: 100%; min-height: 800px; border: none; margin-top: 20px; zoom: 0.8" title="Reporte del Tutor"
            id="reporte-tutor-iframe"></iframe> -->
    </main>

    <script src="{{ asset('proyectoGestionProyectosSoftware/controller/tutor.js') }}"></script>
</body>

</html>