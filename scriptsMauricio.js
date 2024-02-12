let currentBoardIndex = 0; // Variable global para realizar seguimiento del índice actual del tablero

// Función para mostrar los detalles de un tablero
function MostrarDetallesForo(index) {
    currentBoardIndex = index; // Actualiza el índice actual del tablero
    const board = boards[index]; // Obtiene los datos del tablero en la posición 'index'
    const modalDetails = document.getElementById('modalDetails'); // Obtiene el elemento del modal donde se mostrarán los detalles

    // Actualiza el contenido del modal con los detalles del tablero
    modalDetails.innerHTML = `
        <h2>${board.title} - /${board.board}/</h2>
        <p>Descripción: ${board.meta_description}</p>
        <p>Directorio: /${board.board}/</p>
        <p>Hilos por página: ${board.per_page}</p>
        <p>Cantidad de páginas: ${board.pages}</p>
        <p>Tamaño máximo de archivo: ${board.max_filesize} bytes</p>
        <p>Tamaño máximo de archivo WebM: ${board.max_webm_filesize} bytes</p>
        <p>Máximo de caracteres en comentarios: ${board.max_comment_chars}</p>
        <p>Duración máxima de WebM: ${board.max_webm_duration} segundos</p>
        <p>Límite de bumps: ${board.bump_limit}</p>
        <p>Límite de imágenes: ${board.image_limit}</p>
        <p>Cooldown de hilos: ${board.cooldowns.threads} segundos</p>
        <p>Cooldown de respuestas: ${board.cooldowns.replies} segundos</p>
        <p>Cooldown de imágenes: ${board.cooldowns.images} segundos</p>
        <p>Archivado: ${board.is_archived ? 'Sí' : 'No'}</p>
        <p>Spoilers: ${board.ws_board ? 'Sí' : 'No'}</p>
    `;

    // Configuración para mostrar el modal
    const modal = document.getElementById('forumDetailsModal');
    modal.style.display = "block";

    // Configuración para cerrar el modal cuando se hace clic en la 'X'
    document.querySelector('.close').onclick = function() {
        modal.style.display = "none";
    }

    // Configuración para cerrar el modal cuando se hace clic en cualquier parte fuera del modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Función para configurar la navegación entre tableros en el modal
function setupModalNavigation() {
    // Configura los eventos de clic para los botones "Anterior" y "Siguiente" en el modal
    document.getElementById('prevForum').addEventListener('click', () => {
        if (currentBoardIndex > 0) {
            MostrarDetallesForo(currentBoardIndex - 1); // Muestra los detalles del tablero anterior
        }
    });

    document.getElementById('nextForum').addEventListener('click', () => {
        if (currentBoardIndex < boards.length - 1) {
            MostrarDetallesForo(currentBoardIndex + 1); // Muestra los detalles del tablero siguiente
        }
    });
}
