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
        tableContentContainer.appendChild(table); // <-- ¡Esto es lo importante!
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
    const dialogTitle = addUserDialog.querySelector("h2");
    const careerGroup = document.getElementById("career-group");

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

    // Cambiar el campo "Carrera" a múltiple solo si el rol es "coordinador institucional"
    userRoleSelect.addEventListener("change", () => {
        if (userRoleSelect.value === "coordinador institucional") {
            userCareerSelect.setAttribute("multiple", "multiple");
        } else {
            userCareerSelect.removeAttribute("multiple");
        }

        // Si es coordinador departamental, modificar las opciones
        if (userRoleSelect.value === "coordinador departamental") {
            userCareerSelect.innerHTML = `
                <option value="" disabled selected>Seleccione una carrera</option>
                <option value="industrial">Industrial</option>
                <option value="tic_sistemas">TIC y Sistemas</option>
                <option value="gestion">Gestión</option>
                <option value="electronica">Electrónica</option>
                <option value="electromecanica">Electromecánica</option>
                <option value="mecatronica">Mecatrónica</option>
                <option value="logistica">Logística</option>
            `;
        } else {
            // Opciones normales
            userCareerSelect.innerHTML = `
                <option value="" disabled selected>Seleccione una carrera</option>
                <option value="industrial">Industrial</option>
                <option value="sistemas">Sistemas</option>
                <option value="tic">TIC</option>
                <option value="gestion">Gestión</option>
                <option value="electronica">Electrónica</option>
                <option value="electromecanica">Electromecánica</option>
                <option value="mecatronica">Mecatrónica</option>
                <option value="logistica">Logística</option>
            `;
        }
    });

    // Ajustar el contenido de la ventana de diálogo según el rol del usuario actual
    if (userRole === "coordinador institucional") {
        dialogTitle.textContent = "Registrar Coordinador de Departamento";
        userRoleSelect.parentElement.style.display = "none"; // Ocultar el campo de Rol

        // Mostrar solo las carreras para coordinador departamental (con TIC y Sistemas juntos)
        userCareerSelect.removeAttribute("multiple");
        userCareerSelect.innerHTML = `
            <option value="" disabled selected>Seleccione una carrera</option>
            <option value="industrial">Industrial</option>
            <option value="tic_sistemas">TIC y Sistemas</option>
            <option value="gestion">Gestión</option>
            <option value="electronica">Electrónica</option>
            <option value="electromecanica">Electromecánica</option>
            <option value="mecatronica">Mecatrónica</option>
            <option value="logistica">Logística</option>
        `;
    } else if (userRole === "coordinador departamental") {
        dialogTitle.textContent = "Registrar Tutor";
        userRoleSelect.parentElement.style.display = "none"; // Ocultar el campo de Rol

        // Mostrar solo las carreras que administra el coordinador departamental
        userCareerSelect.innerHTML = ""; // Limpiar las opciones actuales

        // Opción inicial
        const initialOption = document.createElement("option");
        initialOption.value = "";
        initialOption.disabled = true;
        initialOption.selected = true;
        initialOption.textContent = "Seleccione una carrera";
        userCareerSelect.appendChild(initialOption);

        // Mapeo frontend -> value para que coincida con la base de datos
        const areaValueMap = {
            "Ingeniería Industrial": "industrial",
            "Ingeniería en Sistemas Computacionales": "sistemas",
            "Ingeniería en Tecnologías de la Información y Comunicaciones": "tic",
            "Ingeniería en Gestión Empresarial": "gestion",
            "Ingeniería Electrónica": "electronica",
            "Ingeniería Electromecánica": "electromecanica",
            "Ingeniería Mecatrónica": "mecatronica",
            "Ingeniería en Logística": "logistica",
            "todas": "todas"
        };

        userAreas.forEach((area) => {
            const option = document.createElement("option");
            option.value = areaValueMap[area] || area.toLowerCase().replace(/ /g, "_");
            option.textContent = area;
            userCareerSelect.appendChild(option);
        });
    }

    // Manejar el evento de agregar usuario
    addUserSubmit.addEventListener("click", async (event) => {
        event.preventDefault();

        // Obtener los valores de los campos
        const userName = document.getElementById("user-name").value;
        const userEmail = document.getElementById("user-email").value;
        let userRoleValue = (userRole === "coordinador departamental")
            ? "tutor"
            : (userRoleSelect.parentElement.style.display === "none"
                ? "coordinador departamental"
                : userRoleSelect.value);
        const userPassword = document.getElementById("user-password").value;

        // Obtener la carrera seleccionada
        const userCareer = userCareerSelect.hasAttribute("multiple")
            ? Array.from(userCareerSelect.selectedOptions).map(option => option.value)
            : [userCareerSelect.value];

        // Definir carrerasEnviar según el rol y selección
        let carrerasEnviar = userCareer;
        if (
            userCareer[0] === "tic_sistemas"
        ) {
            carrerasEnviar = ["tic", "sistemas"];
        }

        // Validar que todos los campos estén llenos
        if (
            !userName ||
            !userEmail ||
            !userRoleValue ||
            !userPassword ||
            ((!userCareer[0] || userCareer[0] === ""))
        ) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Validar campos antes de enviar
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_\+\-=\[\]{},]{8,20}$/;

        if (!userName || !nameRegex.test(userName)) {
            alert("El nombre solo puede contener letras (mayúsculas, minúsculas y acentos).");
            return;
        }
        if (!userEmail || !emailRegex.test(userEmail)) {
            alert("Ingrese un correo electrónico válido.");
            return;
        }
        if (!userPassword || !passwordRegex.test(userPassword)) {
            alert("La contraseña debe tener entre 8 y 20 caracteres y solo puede contener letras, números y !@#$%^&*()_+-=[]{},");
            return;
        }

        // Si el rol es coordinador departamental, enviar como "tutor" y sin contraseña
        let apiUserRole = userRoleValue;
        let apiUserPassword = userPassword;
        if (userRoleValue === "tutor") {
            apiUserRole = "coordinador departamental";
            apiUserPassword = ""; // No enviar contraseña
        }

        // Preparar los datos para enviar
        const userData = {
            nombre: userName,
            correo: userEmail,
            rol: apiUserRole,
            carrera: carrerasEnviar,
            password: apiUserPassword
        };

        try {
            // Enviar los datos al servidor
            const response = await fetch('/usuarios/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                alert("Usuario agregado exitosamente.");
                addUserDialog.style.display = "none"; // Ocultar la ventana
                fetchUpdatedUsuarios(); // Actualizar la tabla
            } else {
                const errorData = await response.json();
                alert(`Error al agregar usuario: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error al enviar los datos del usuario:", error);
            alert("Error al agregar usuario. Por favor, intenta nuevamente más tarde.");
        }
    });
});