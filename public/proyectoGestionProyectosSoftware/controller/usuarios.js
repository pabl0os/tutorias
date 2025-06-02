document.addEventListener("DOMContentLoaded", () => {
    const tableContentContainer = document.getElementById("table-content");

    // Datos de ejemplo para la tabla
    const usuarios = [
        { nombre: "Andrea López", correo: "andrea.lopez@example.com" },
        { nombre: "Miguel Torres", correo: "miguel.torres@example.com" },
        { nombre: "Sofía Martínez", correo: "sofia.martinez@example.com" }
    ];

    // Función para renderizar la tabla
    function renderTable(data) {
        tableContentContainer.innerHTML = "";

        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${data
                    .map(
                        (row, i) => `
                        <tr>
                            <td>${row.nombre}</td>
                            <td>${row.correo}</td>
                            <td>
                                <button class="action-button view-btn">
                                    <img src="proyectoGestionProyectosSoftware/icons/botones/ver.svg" alt="Ver" />
                                </button>
                                <button class="action-button delete-btn" data-index="${i}">
                                    <img src="proyectoGestionProyectosSoftware/icons/botones/eliminar.svg" alt="Eliminar" />
                                </button>
                            </td>
                        </tr>
                    `
                    )
                    .join("")}
            </tbody>
        `;

        tableContentContainer.appendChild(table);
    }

    // Renderizar la tabla inicial
    renderTable(usuarios);

    // Agregar funcionalidad de búsqueda
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        const filteredData = usuarios.filter(user =>
            user.nombre.toLowerCase().includes(query) ||
            user.correo.toLowerCase().includes(query)
        );
        renderTable(filteredData);
    });

    const optionsButton = document.getElementById("options-button");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const downloadReports = document.getElementById("download-reports");
    const deleteReports = document.getElementById("delete-reports");

    // Mostrar/ocultar el menú desplegable
    optionsButton.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Ocultar el menú si se hace clic fuera de él
    document.addEventListener("click", (event) => {
        if (!optionsButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    // Manejar clic en "Descargar todos los reportes"
    downloadReports.addEventListener("click", () => {
        alert("Descargando todos los reportes...");
        dropdownMenu.style.display = "none";
    });

    // Manejar clic en "Borrar todos los reportes"
    deleteReports.addEventListener("click", () => {
        const confirmDelete = confirm("¿Estás seguro de que deseas borrar todos los reportes?");
        if (confirmDelete) {
            alert("Todos los reportes han sido borrados.");
        }
        dropdownMenu.style.display = "none";
    });

    const filterButton = document.getElementById("filter-button");
    const filterDialog = document.getElementById("filter-dialog");
    const closeDialogButton = document.getElementById("close-dialog");

    // Mostrar la ventana de diálogo al hacer clic en el botón de filtrar
    filterButton.addEventListener("click", () => {
        filterDialog.style.display = "flex"; // Mostrar la ventana
    });

    // Ocultar la ventana de diálogo al hacer clic en el botón "Cerrar"
    closeDialogButton.addEventListener("click", () => {
        filterDialog.style.display = "none"; // Ocultar la ventana
    });

    // Ocultar la ventana de diálogo al hacer clic fuera de ella
    filterDialog.addEventListener("click", (event) => {
        if (event.target === filterDialog) {
            filterDialog.style.display = "none";
        }
    });

    // Permitir deseleccionar los radio buttons
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("click", (event) => {
            if (radio.dataset.checked === "true") {
                // Si ya está seleccionado, deselecciónalo
                radio.checked = false;
                radio.dataset.checked = "false";
            } else {
                // Si no está seleccionado, seleccionarlo normalmente
                document.querySelectorAll(`input[name="${radio.name}"]`).forEach((otherRadio) => {
                    otherRadio.dataset.checked = "false"; // Deseleccionar otros radios del mismo grupo
                });
                radio.dataset.checked = "true";
            }
        });
    });

    // Mostrar la ventana de diálogo al hacer clic en el botón "Agregar"
    const addButton = document.getElementById("add-button");
    const addUserDialog = document.getElementById("add-user-dialog");
    const addUserCancel = document.getElementById("add-user-cancel");
    const addUserSubmit = document.getElementById("add-user-submit");

    addButton.addEventListener("click", () => {
        addUserDialog.style.display = "flex"; // Mostrar la ventana
    });

    // Ocultar la ventana de diálogo al hacer clic en "Cancelar"
    addUserCancel.addEventListener("click", () => {
        addUserDialog.style.display = "none"; // Ocultar la ventana
    });

    // Ocultar la ventana de diálogo al hacer clic fuera de ella
    addUserDialog.addEventListener("click", (event) => {
        if (event.target === addUserDialog) {
            addUserDialog.style.display = "none";
        }
    });

    // Manejar el evento de agregar usuario
    addUserSubmit.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores de los campos
        const userName = document.getElementById("user-name").value;
        const userEmail = document.getElementById("user-email").value;
        const userCareer = document.getElementById("user-career").value;
        const userRole = document.getElementById("user-role").value;

        // Validar que todos los campos estén llenos
        if (!userName || !userEmail || !userCareer || !userRole) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Agregar el nuevo usuario a la tabla
        usuarios.push({
            nombre: userName,
            correo: userEmail,
            carrera: userCareer,
            rol: userRole,
        });

        // Actualizar la tabla
        renderTable(usuarios);

        // Cerrar la ventana de diálogo
        addUserDialog.style.display = "none";

        // Limpiar el formulario
        document.getElementById("add-user-form").reset();
    });

    // Delegación de eventos para detectar click en el botón con el icono "Ver"
    tableContentContainer.addEventListener("click", (event) => {
        const button = event.target.closest("button.action-button");
        if (button) {
            const img = button.querySelector("img");
            if (img && img.getAttribute("alt") === "Ver") {
                // Actualizar el src del iframe del documento padre para cargar usuarios-ver.html
                window.parent.document.querySelector("iframe[name='contenido']").src = "/usuarios-ver";
            }
        }
    });

    // Delegación de eventos para eliminar usuario
    tableContentContainer.addEventListener("click", (event) => {
        const deleteBtn = event.target.closest("button.delete-btn");
        if (deleteBtn) {
            const userIndex = parseInt(deleteBtn.dataset.index, 10);
            const deleteDialog = document.getElementById("delete-user-dialog");
            const confirmDelete = document.getElementById("confirm-delete");
            const cancelDelete = document.getElementById("cancel-delete");

            deleteDialog.showModal();

            // Limpiar eventos anteriores
            confirmDelete.onclick = null;
            cancelDelete.onclick = null;

            confirmDelete.onclick = () => {
                usuarios.splice(userIndex, 1); // Elimina el usuario del array
                renderTable(usuarios);         // Vuelve a renderizar la tabla
                deleteDialog.close();
            };

            cancelDelete.onclick = () => {
                deleteDialog.close();
            };
        }
    });
});