// Manejo de los íconos de la barra lateral
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const iframe = document.querySelector('iframe[name="contenido"]'); // Selecciona el iframe principal

    // Función para cargar el contenido del primer ícono visible
    function loadFirstVisibleOption() {
        const firstVisibleItem = Array.from(menuItems).find(item => {
            return window.getComputedStyle(item).display !== 'none'; // Verifica si el ítem es visible
        });

        if (firstVisibleItem) {
            const url = firstVisibleItem.getAttribute('data-url'); // Obtiene la URL del atributo data-url
            iframe.src = url; // Carga el contenido correspondiente en el iframe
            firstVisibleItem.classList.add('active'); // Marca el primer ícono como activo
        }
    }

    // Manejo de clics en los íconos de la barra lateral
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active')); // Remueve la clase activa de todos los íconos
            item.classList.add('active'); // Agrega la clase activa al ícono seleccionado

            const url = item.getAttribute('data-url'); // Obtiene la URL del atributo data-url
            iframe.src = url; // Cambia el contenido del iframe al archivo correspondiente
        });
    });

    // Cargar automáticamente el contenido del primer ícono visible
    loadFirstVisibleOption();

    // Manejo del ícono de perfil
    const profileMenu = document.querySelector('.profile-menu');
    const profileIcon = document.querySelector('.profile-icon');

    profileIcon.addEventListener('click', () => {
        profileMenu.classList.toggle('active'); // Muestra/oculta el menú desplegable
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        if (!profileMenu.contains(event.target) && !profileIcon.contains(event.target)) {
            profileMenu.classList.remove('active');
        }
    });
});
