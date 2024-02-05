
document.addEventListener('DOMContentLoaded', init);


let currentPage = 1; 
const boardsPerPage = 50; 
let boards = [];

// Función principal de inicialización
async function init() {
    await CargarPagina(); // Carga los datos de la página
    setupEventListeners(); // Configura los event listeners
    setupModalNavigation(); // Configura la navegación en el modal
}


// Función para cargar las tablas en la página
function CargarTablas() {
    const boardListElement = document.getElementById('boardList'); // Obtiene el elemento donde se mostrarán los tableros
    boardListElement.innerHTML = ''; 

    const startIndex = (currentPage - 1) * boardsPerPage; 
    const endIndex = Math.min(startIndex + boardsPerPage, boards.length); 
    const boardsToShow = boards.slice(startIndex, endIndex); // Obtiene los tableros que se mostrarán en la página actual

    
    boardsToShow.forEach((board, index) => {
        const actualIndex = startIndex + index; // Calcula el índice actual basado en la paginación
        const boardElement = document.createElement('div'); // Crea un elemento 'div' para mostrar el tablero
        boardElement.innerHTML = `
            <strong>${board.title}</strong> - Páginas: ${board.pages}, Archivado: ${board.is_archived ? 'Sí' : 'No'}, Directorio: /${board.board}/
        `;
        boardElement.addEventListener('click', () => MostrarDetallesForo(actualIndex)); // Agrega un event listener para mostrar los detalles del tablero al hacer clic
        boardListElement.appendChild(boardElement); // Agrega el elemento del tablero a la lista de tableros en la página
    });

    updatePaginationControls(); 
}

// Función para cargar la página
async function CargarPagina() {
    const ahora = new Date().getTime();
    const ultimaActualizacion = localStorage.getItem('ultimaActualizacion');
    const datosVencidos = !ultimaActualizacion || ahora - ultimaActualizacion > 24 * 60 * 60 * 1000; // Verifica si los datos están vencidos (24 horas en milisegundos)

    if (datosVencidos) {
        try {
            const response = await fetch('proxy.php'); 
            const data = await response.json(); 
            boards = data.boards; 
            originalBoards = [...data.boards]; // Realiza una copia de seguridad de los tableros originales
            // Guarda los datos y la marca de tiempo de la última actualización en localStorage
            localStorage.setItem('boardsData', JSON.stringify(data.boards));
            localStorage.setItem('ultimaActualizacion', ahora.toString());
        } catch (error) {
            console.error('Error fetching boards:', error); // Manejo de errores en caso de que la solicitud falle
        }
    } else {
        // Carga los datos desde localStorage si no están vencidos
        boards = JSON.parse(localStorage.getItem('boardsData'));
        originalBoards = [...boards]; // Realiza una copia de seguridad de los tableros originales con los datos de localStorage
    }
    CargarTablas(); 
}



