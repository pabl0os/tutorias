document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.querySelector(".tabs");
    const tabContentContainer = document.getElementById("tab-content");

    // Si solo quieres dejar las pestañas y los botones, elimina todo lo relacionado con la tabla:
    const botones = [
        { texto: "Exportar", clase: "export-button" },
        { texto: "Autocompletar", clase: "autocomplete-button" }
    ];

    // Ejemplo de pestañas (puedes ajustar según tus necesidades)
    ["Sistemas", "TICS"].forEach((grupo, index) => {
        const button = document.createElement("button");
        button.classList.add("tab-button");
        if (index === 0) button.classList.add("active");
        button.textContent = grupo.toUpperCase();
        tabsContainer.appendChild(button);
    });

    // Agrega los botones debajo de las pestañas
    const tableControls = document.createElement("div");
    tableControls.classList.add("table-controls");
    botones.forEach(btnInfo => {
        const btn = document.createElement("button");
        btn.className = btnInfo.clase;
        btn.textContent = btnInfo.texto;
        tableControls.appendChild(btn);
    });
    tabContentContainer.appendChild(tableControls);
});