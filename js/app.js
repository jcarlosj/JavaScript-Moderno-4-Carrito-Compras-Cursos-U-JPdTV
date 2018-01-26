/* Carrito de Compras (LocalStorage)
   Agregar, Eliminar, Mostrar los cursos agregados al carrito de compras */

/* Obtenemos los elementos del DOM donde vamos a agregar los cursos */   
const carritoCompras = document .getElementById( 'carrito' ),          // Elemento Padre de 'lista-cursos'
      listaCursos    = document .getElementById( 'lista-cursos' );      // Elemento hijo de 'carrito'

/* Escucha los eventos */
cargarEventos();                                                                                                                                                                                                                                                                                    

function cargarEventos() {
    // Dispara cuando se presiona 'Agregar carrito'
    listaCursos .addEventListener( 'click', comprarCurso );

}

// Función que agrega curso al carrito de compras                                                                                                                                                                                                                           
function comprarCurso( e ) {
    e .preventDefault();        // Previene la ejecución del 'action' definido en el formulario
 
    console .group( 'Comprar Curso' );
        console .log( 'e.target.classList ' , e .target .classList );

        // Delegation: Valida si el elemento al que se le dió click contiene la clase 'agregar carrito'
        if( e .target .classList .contains( 'agregar-carrito' ) ) {

            const curso = e .target .parentElement .parentElement;      // Card del Curso

            leerDatosCurso( curso );
            console .log( 'Elemento Card del Curso: ', curso );
        }

    console .groupEnd();
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

// Función que lee los datos del curso
function leerDatosCurso( curso ) {
    console .log( 'leerDatosCurso ', curso );
}