let ordenTituloAscendente = true; // Variable para controlar el orden ascendente o descendente por título

// Función para ordenar los tableros por título
function ordenarPorTitulo() {
    if (ordenTituloAscendente) {
        boards.sort((a, b) => a.title.localeCompare(b.title));
    } else { 
        boards.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    ordenTituloAscendente = !ordenTituloAscendente;

    currentPage = 1; // Vuelve a la primera página
    CargarTablas(); // Actualiza el listado
}


let ordenHilos = "asc"; // Variable para controlar el orden ascendente o descendente por número de hilos


// Función para ordenar los tableros por número de hilos
function ordenarPorHilos() {
    if (ordenHilos === "asc") {
        
        boards.sort((a, b) => a.per_page - b.per_page);
        ordenHilos = "desc"; 
    } else {
      
        boards.sort((a, b) => b.per_page - a.per_page);
        ordenHilos = "asc"; 
    }

    currentPage = 1; // Vuelve a la primera página
    CargarTablas(); // Actualiza el listado 
}

let originalBoards = []; // Almacena el listado original de tableros


// Función para filtrar los tableros por título
function filtrarPorTitulo() {
    const textoFiltro = document.getElementById('filterInput').value.toLowerCase();
    boards = originalBoards.filter(board => board.title.toLowerCase().includes(textoFiltro));
    currentPage = 1; // Vuelve 
    CargarTablas(); // Actualiza el listado
}


// Función para restablecer el listado de tableros al estado original
function resetearListado() {
    boards = [...originalBoards]; // Restablece a la copia original de tableros
    currentPage = 1; // Vuelve 
    CargarTablas(); // Actualiza el listado de tableros
}