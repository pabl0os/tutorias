document.addEventListener("DOMContentLoaded", () => {
    const tableContentContainer = document.getElementById("table-content");
    const searchBar = document.getElementById("search-bar");

    // Función para renderizar la tabla
    function renderTable(data) {
        tableContentContainer.innerHTML = "";

        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Carrera</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${data
                .map(
                    (row) => `
                            <tr>
                                <td>${row.nombre || "Sin nombre"}</td>
                                <td>${row.correo || "Sin correo"}</td>
                                <td>${row.rol || "Sin rol"}</td>
                                <td>${row.carrera || "Sin carrera"}</td>
                                <td>
                                    <button class="action-button view-btn" data-id="${row.id}">
                                        <img src="proyectoGestionProyectosSoftware/icons/botones/ver.svg" alt="Ver" />
                                    </button>
                                    <button class="action-button delete-btn" data-id="${row.id}">
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

    // Función para obtener los usuarios actualizados desde el backend
    async function fetchUpdatedUsuarios() {
        try {
            const response = await fetch('/usuarios/lista');
            if (response.ok) {
                const updatedUsuarios = await response.json();
                window.usuarios = updatedUsuarios; // Actualizar el array global
                renderTable(window.usuarios); // Renderizar la tabla con los datos actualizados
            } else {
                console.error("Error al obtener los datos actualizados.");
                alert("Error al actualizar la tabla.");
            }
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    }

    // Renderizar la tabla inicial
    fetchUpdatedUsuarios();

    // Agregar funcionalidad de búsqueda
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        const filteredData = window.usuarios.filter(user =>
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
    const userRoleSelect = document.getElementById("user-role");
    const userCareerSelect = document.getElementById("user-career");

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

    // Cambiar el campo "Carrera" a múltiple solo si el rol es "Coordinador Departamental"
    userRoleSelect.addEventListener("change", () => {
        if (userRoleSelect.value === "coordinador departamental") {
            userCareerSelect.setAttribute("multiple", "multiple");
        } else {
            userCareerSelect.removeAttribute("multiple");
        }
    });

    // Manejar el evento de agregar usuario
    addUserSubmit.addEventListener("click", async (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores de los campos
        const userName = document.getElementById("user-name").value;
        const userEmail = document.getElementById("user-email").value;
        const userRole = userRoleSelect.value;
        const userPassword = document.getElementById("user-password").value;

        // Obtener las carreras seleccionadas (como array si es múltiple)
        const userCareer = userCareerSelect.hasAttribute("multiple")
            ? Array.from(userCareerSelect.selectedOptions).map(option => option.value)
            : [userCareerSelect.value];

        // Validar que todos los campos estén llenos
        if (!userName || !userEmail || !userRole || !userPassword || userCareer.length === 0) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Crear el objeto de datos para enviar al backend
        const userData = {
            nombre: userName,
            correo: userEmail,
            rol: userRole,
            contrasena: userPassword,
            carreras: userCareer,
        };

        console.log("Datos enviados al backend:", userData);

        try {
            const response = await fetch('/usuarios/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || "Usuario registrado exitosamente.");
                // Actualizar la tabla con el nuevo usuario
                window.usuarios.push(userData);
                renderTable(window.usuarios);
                // Cerrar la ventana de diálogo
                document.getElementById("add-user-dialog").style.display = "none";
                // Limpiar el formulario
                document.getElementById("add-user-form").reset();
            } else {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                alert("Error al registrar el usuario.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al registrar el usuario.");
        }
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
    tableContentContainer.addEventListener("click", async (event) => {
        const deleteBtn = event.target.closest("button.delete-btn");
        if (deleteBtn) {
            const row = deleteBtn.closest("tr"); // Obtener el renglón de la tabla
            const userName = row.querySelector("td:nth-child(1)").textContent.trim(); // Nombre
            const userEmail = row.querySelector("td:nth-child(2)").textContent.trim(); // Correo

            const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar al usuario "${userName}" (${userEmail})?`);
            if (confirmDelete) {
                try {
                    const response = await fetch('/usuarios/eliminar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        },
                        body: JSON.stringify({ nombre: userName, correo: userEmail }),
                    });

                    if (response.ok) {
                        alert("Usuario eliminado exitosamente.");
                        await fetchUpdatedUsuarios(); // Actualizar los usuarios después de eliminar
                    } else {
                        const errorText = await response.text();
                        console.error("Error del servidor:", errorText);
                        alert("Error al eliminar el usuario.");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("Ocurrió un error al eliminar el usuario.");
                }
            }
        }
    });


    // PENDIENTE POR CHECAR ES CUANDO SE LE DA CLICK AL BOTÓN VER
    tableContentContainer.addEventListener("click", async (event) => {
        const viewBtn = event.target.closest("button.view-btn");
        if (viewBtn) {
            const row = viewBtn.closest("tr"); // Obtener el renglón de la tabla
            const userName = row.querySelector("td:nth-child(1)").textContent.trim(); // Nombre
            const userEmail = row.querySelector("td:nth-child(2)").textContent.trim(); // Correo
            const userRole = row.querySelector("td:nth-child(3)").textContent.trim(); // Rol
            const userCareer = row.querySelector("td:nth-child(4)").textContent.trim(); // Carrera

            console.log("Datos enviados:", {
                nombre: userName,
                correo: userEmail,
                rol: userRole,
                carrera: userCareer,
            });
            try {
                // Realizar la consulta al backend para obtener los datos del usuario
                const response = await fetch(`/usuarios/ver?nombre=${userName}&correo=${userEmail}&rol=${userRole}`);


                if (response.ok) {
                    const userData = await response.json();
                    console.log("Datos del usuario:", userData); // Imprimir los datos en la consola
                } else {
                    const errorText = await response.text();
                    console.error("Error al obtener los datos del usuario:", errorText);
                }
            } catch (error) {
                console.error("Error al realizar la consulta:", error);
            }
        }
    });
});