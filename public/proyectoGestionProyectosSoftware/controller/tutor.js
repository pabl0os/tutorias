document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.querySelector(".tabs");
    const tabContentContainer = document.getElementById("tab-content");

    // Datos de ejemplo para las tablas
    const grupos = {
        "grupo-uno": [
            { nombre: "Juan Pérez", correo: "juan.perez@example.com", calificacion: 90 },
            { nombre: "María López", correo: "maria.lopez@example.com", calificacion: 85 }
        ],
        "grupo-dos": [
            { nombre: "Carlos García", correo: "carlos.garcia@example.com", calificacion: 88 },
            { nombre: "Ana Martínez", correo: "ana.martinez@example.com", calificacion: 92 }
        ]
    };

    // Crear las pestañas principales
    Object.keys(grupos).forEach((grupo, index) => {
        const button = document.createElement("button");
        button.classList.add("tab-button");
        if (index === 0) button.classList.add("active");
        button.textContent = grupo.replace("-", " ").toUpperCase();
        button.dataset.tab = grupo;

        button.addEventListener("click", () => {
            // Cambiar la pestaña activa
            document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Limpiar el contenido del tab
            tabContentContainer.innerHTML = "";

            // Agregar subpestañas al cambiar de grupo
            addSubTabs(tabContentContainer);
        });

        tabsContainer.appendChild(button);
    });

    // Función para agregar subpestañas y el botón Exportar
    function addSubTabs(container) {
        // Crear contenedor de subpestañas
        const subTabsContainer = document.createElement("div");
        subTabsContainer.classList.add("sub-tabs");

        // Subpestañas
        const subTabs = [
            { label: "Formato principal", id: "formato-principal" },
            { label: "Nivel de desempeño", id: "nivel-desempeno" }
        ];

        // Contenedor para el contenido dinámico de subpestañas
        const subTabContent = document.createElement("div");
        subTabContent.classList.add("sub-tab-content");

        subTabs.forEach((subTab, idx) => {
            const subBtn = document.createElement("button");
            subBtn.classList.add("sub-tab-button");
            if (idx === 0) subBtn.classList.add("active");
            subBtn.textContent = subTab.label;
            subBtn.dataset.subtab = subTab.id;

            subBtn.addEventListener("click", () => {
                subTabsContainer.querySelectorAll(".sub-tab-button").forEach(btn => btn.classList.remove("active"));
                subBtn.classList.add("active");
                // Cambiar el contenido según la subpestaña seleccionada
                if (subTab.id === "formato-principal") {
                    subTabContent.innerHTML = `
                        <iframe src="/REPORTE-DEL-TUTOR"
                            style="width: 100%; min-height: 800px; border: none; margin-top: 20px; zoom: 0.8"
                            title="Reporte del Tutor"
                            id="reporte-tutor-iframe"></iframe>
                    `;
                } else if (subTab.id === "nivel-desempeno") {
                    subTabContent.innerHTML = `
                        <iframe src="/NIVEL-DE-DESEMPENO-TUTORADOS"
                            style="width: 100%; min-height: 800px; border: none; margin-top: 20px; zoom: 1.3"
                            title="Nivel de Desempeño Tutorados"
                            id="nivel-desempeno-iframe"></iframe>
                    `;
                }
            });

            subTabsContainer.appendChild(subBtn);
        });

        container.appendChild(subTabsContainer);

        // Botón Exportar debajo de las subpestañas, alineado a la izquierda
        const exportBtnContainer = document.createElement("div");
        exportBtnContainer.style.display = "flex";
        exportBtnContainer.style.justifyContent = "flex-start";
        exportBtnContainer.style.margin = "10px 0";

        const exportBtn = document.createElement("button");
        exportBtn.textContent = "Exportar";
        exportBtn.className = "export-button";
        exportBtnContainer.appendChild(exportBtn);

        container.appendChild(exportBtnContainer);

        // Agregar el contenedor de contenido de subpestañas
        container.appendChild(subTabContent);

        // Mostrar por defecto el contenido de la primera subpestaña
        subTabContent.innerHTML = `
            <iframe src="/REPORTE-DEL-TUTOR"
                style="width: 100%; min-height: 800px; border: none; margin-top: 20px; zoom: 0.8"
                title="Reporte del Tutor"
                id="reporte-tutor-iframe"></iframe>
        `;
    }

    // Mostrar subpestañas y botón Exportar en el grupo inicial
    addSubTabs(tabContentContainer);
});
