document.addEventListener("DOMContentLoaded", () => {
    // Manejar el cambio de pestañas
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            // Aquí puedes agregar lógica para mostrar contenido diferente según la pestaña
        });
    });

    // Manejar el cambio de subpestañas y cargar el HTML correspondiente
    document.querySelectorAll(".sub-tab").forEach(subTab => {
        subTab.addEventListener("click", () => {
            document.querySelectorAll(".sub-tab").forEach(st => st.classList.remove("active"));
            subTab.classList.add("active");

            const tableContainer = document.getElementById("table-container");
            tableContainer.innerHTML = ""; // Limpia el contenido anterior

            if (subTab.dataset.subtab === "formato") {
                // Cargar REPORTE-DEL-TUTOR.html en un iframe
                tableContainer.innerHTML = `
                    <iframe src="/REPORTE-DEL-TUTOR"
                        style="width: 100%; min-height: 800px; border: none; margin-top: 20px; zoom: 1.3"
                        title="Reporte del Tutor"></iframe>
                `;
            } else if (subTab.dataset.subtab === "desempeno") {
                // Cargar NIVEL-DE-DESEMPEÑO-TUTORADOS.html en un iframe
                tableContainer.innerHTML = `
                    <iframe src="/NIVEL-DE-DESEMPENO-TUTORADOS"
                        style="width: 100%; min-height: 800px; border: none; margin-top: 20px; zoom: 1.3"
                        title="Nivel de Desempeño Tutorados"></iframe>
                `;
            }
        });
    });

    // Mostrar por defecto el formato principal al cargar la página
    const defaultSubTab = document.querySelector('.sub-tab.active');
    if (defaultSubTab) {
        defaultSubTab.click();
    }

    // Editar usuario (abrir diálogo)
    const editButton = document.getElementById("edit-button");
    const editDialog = document.getElementById("edit-dialog");
    const closeDialogBtn = document.getElementById("close-dialog");
    const editForm = document.getElementById("edit-user-form");

    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    const userArea = document.getElementById("user-area");



    document.getElementById("btn-atra").addEventListener("click", function () {
        if (window.top !== window) {
            window.top.document.querySelector('iframe[name="contenido"]').src = "/usuarios";
        }
    });

    const sidebar = document.getElementById("sidebar");
    const sidebarTab = document.getElementById("sidebar-tab");

    if (!sidebar || !sidebarTab) {
        console.error("No se encontraron los elementos del sidebar o la pestaña.");
        return;
    }

    // Alternar entre abierto y cerrado al hacer clic en la pestaña
    sidebarTab.addEventListener("click", () => {
        console.log("¡Click en la pestaña del sidebar!");
        if (sidebar.classList.contains("closed")) {
            sidebar.classList.remove("closed");
            sidebar.classList.add("open");
        } else {
            sidebar.classList.remove("open");
            sidebar.classList.add("closed");
        }
    });

    // Abrir el diálogo de edición
    editButton.addEventListener("click", () => {
        editDialog.showModal();
    });

    // Cerrar el diálogo de edición
    closeDialogBtn.addEventListener("click", () => {
        editDialog.close();
    });

    // Guardar los cambios del formulario
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Actualizar la información del usuario
        userName.textContent = document.getElementById("edit-name").value;
        userEmail.textContent = document.getElementById("edit-email").value;
        userArea.textContent = document.getElementById("edit-area").value;

        // Cerrar el diálogo
        editDialog.close();
    });
});