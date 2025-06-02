document.addEventListener("DOMContentLoaded", () => {
    const tableControlsContainer = document.getElementById("table-controls");
    const tableContentContainer = document.getElementById("table-content");

    // Crear controles de tabla
    const tableControls = document.createElement("div");
    tableControls.classList.add("table-controls");

    const exportButton = document.createElement("button");
    exportButton.classList.add("export-button");
    exportButton.textContent = "Exportar";

    const filterButton = document.createElement("button");
    filterButton.classList.add("filter-button");
    filterButton.textContent = "Filtrar";

    tableControls.appendChild(exportButton);
    tableControls.appendChild(filterButton);

    // Agregar controles al contenedor
    tableControlsContainer.appendChild(tableControls);

    // Crear tabla con columnas y 5 registros de ejemplo
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Número de Control</th>
                <th>Nombre</th>
                <th>Carrera</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>20190001</td>
                <td>Juan Pérez</td>
                <td>Ingeniería en Sistemas</td>
            </tr>
            <tr>
                <td>20190002</td>
                <td>María López</td>
                <td>Ingeniería Industrial</td>
            </tr>
            <tr>
                <td>20190003</td>
                <td>Carlos Ramírez</td>
                <td>Ingeniería Civil</td>
            </tr>
            <tr>
                <td>20190004</td>
                <td>Ana Torres</td>
                <td>Ingeniería en Gestión Empresarial</td>
            </tr>
            <tr>
                <td>20190005</td>
                <td>Luis Gómez</td>
                <td>Ingeniería Electrónica</td>
            </tr>
        </tbody>
    `;
    tableContentContainer.appendChild(table);

    // Si tienes pestañas, aquí puedes dejar el código para generarlas.
});