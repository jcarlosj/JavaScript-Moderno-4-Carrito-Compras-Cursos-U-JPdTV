/* Carrito de Compras (LocalStorage)
   Agregar, Eliminar, Mostrar los cursos agregados al carrito de compras */

/* Obtenemos los elementos del DOM donde vamos a agregar los cursos */   
const carritoCompras = document .getElementById( 'carrito' ),          // Elemento Padre de 'lista-cursos'
      listaCursos    = document .getElementById( 'lista-cursos' ),     // Elemento hijo de 'carrito'
      cursosEnElCarrito = document .querySelector( '#lista-carrito tbody' ),    // Elemento donde se van a insertar los cursos al carrito
      botonVaciarCarrito = document . getElementById( 'vaciar-carrito' );       // Elemento botón con la clase 'vaciar-carrito' 

/* Escucha los eventos */
cargarEventos();                                                                                                                                                                                                                                                                                    

function cargarEventos() {
    // Dispara cuando se presiona 'Agregar carrito'
    listaCursos .addEventListener( 'click', comprarCurso );         // Agrega Curso al Carrito

    // Dispara cuando se presiona la X en el listado de Cursos en el Carrito
    carritoCompras .addEventListener( 'click', eliminarCurso );     // Elimina Curso del Carrito

    // Dispara cuando se presiona el botón de 'Vaciar Carrito' en el listado de Cursos del Carrito
    botonVaciarCarrito .addEventListener( 'click', vaciarCarrito ); // Elimina todos los cursos del Carrito

    // Dispara al cargarse totalmente el documento, para obtener todos los datos almacenados en el LocalStorage
    document .addEventListener( 'DOMContentLoaded', leerLocalStorage ); 
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
        }

    console .groupEnd();
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

// Función que lee los datos del curso
function leerDatosCurso( curso ) {
    // Creamos un objeto con todos los datos del curso
    const infoCurso = {
        imagen: curso .querySelector( 'img' ) .src,                     // Obtenemos el URL de la imagen
        titulo: curso .querySelector( 'h4' ) .textContent,              // Obtenemos el nombre del curso
        precio: curso .querySelector( '.precio span' ) .textContent,    // Obtenemos el precio del curso
        id:     curso .querySelector( 'a' ) .getAttribute( 'data-id' )  // Obtenemos el id del curso (valor personalizado)
    }

    console .log( 'leerDatosCurso ', infoCurso );

    insertarAlCarrito( infoCurso );
}

// Functión que muestra el curso seleccionado en el carrito en el DOM
function insertarAlCarrito( curso ) {
    // Construir el Template
    const filaTabla = document .createElement( 'tr' );          // Crea elemento HTML 'tr'

    // Creamos un 'String Template' que queremos que se despliegue dentro del elemento creado 'tr'
    filaTabla .innerHTML = `
        <td>
            <img src="${ curso .imagen }" width="120" />
        </td>
        <td>${ curso .titulo }</td>
        <td>${ curso .precio }</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${ curso .id }" >x</a>
        </td>
    `;

    cursosEnElCarrito .appendChild( filaTabla );        // Insertamos el 'String Template' del curso en el DOM
    guardarCursoLocalStorage( curso );
}

// Función que elimina curso del carrito de compras en el DOM
function eliminarCurso( e ) {
    let curso,
        cursoId;

    e .preventDefault();        // Previene la ejecución del 'action' definido en el formulario
 
    console .group( 'Eliminar Curso' );
        console .log( 'e.target.classList ' , e .target .classList );

        // Delegation: Valida si el elemento al que se le dió click contiene la clase 'borrar-curso'
        if( e .target .classList .contains( 'borrar-curso' ) ) {
            e .target .parentElement .parentElement .remove();      // Elimina estructura HTML del curso en el DOM

            curso = e .target .parentElement .parentElement;                    // Obtengo el 'tr' de la estructura HTML del curso en el DOM
            cursoId = curso .querySelector( 'a' ) .getAttribute( 'data-id' );   // Obtengo el ID del curso del enlace
            console .log( 'Eliminará con "data-id" ', cursoId );
        }

        eliminarCursoLocalStorage( cursoId );        

    console .groupEnd();
}

// Función que elimina todos los cursos del carrito de compras
function vaciarCarrito() {
 
    //cursosEnElCarrito .innerHTML = '';          // Forma Lenta

    // Verifica si existen elementos dentro de la lista del carrito de compra en el DOM
    while( cursosEnElCarrito .firstChild ) {    // Forma Rápida y recomendada
        cursosEnElCarrito .removeChild( cursosEnElCarrito .firstChild );    // Remueve los elementos hijos de la lista del carrito en el DOM
    }

    vaciarLocalStorage();    
    return false;       // Evita el salto de los elementos
}

// Función con la que se almacenan los cursos al carrito en el LocalStorage
function guardarCursoLocalStorage( curso ) {
    let cursos;

    cursos = obtenerCursosLocalStorage();       // Obtenemos los Cursos del LocalStorage (Recibe un 'Array')
    cursos .push( curso );                      // El curso seleccionado se agrega al 'Array'
    localStorage .setItem( 'cursos', JSON .stringify( cursos ) );   // Convierte el 'Array' a un 'String' y Actualiza los datos en el LocalStorage 
}

// Función con la que comprueba que existan cursos en el LocalStorage (Retora un 'String')
function obtenerCursosLocalStorage() {
    let cursosEnLocalStorage;

    // Verificamos si hay algo en el LocalStorage
    if( localStorage .getItem( 'cursos' ) == null ) {
        cursosEnLocalStorage = [];
    }
    else {
        cursosEnLocalStorage = JSON .parse( localStorage .getItem( 'cursos' ) );    // Convierte de 'Array' a 'String' y almacena en el LocalStorage
    }

    return cursosEnLocalStorage;    
}

// Función que obtiene los datos del LocalStorage y los muestra en el carrito de compras en el DOM
function leerLocalStorage() {
    let cursosEnLocalStorage;

    cursosEnLocalStorage = obtenerCursosLocalStorage();

    console .log( 'Cursos en el LocalStorage: ', cursosEnLocalStorage );

    //
    cursosEnLocalStorage .forEach( function( curso ) {
        // Construir el Template
        const filaTabla = document .createElement( 'tr' );          // Crea elemento HTML 'tr'

        // Creamos un 'String Template' que queremos que se despliegue dentro del elemento creado 'tr'
        filaTabla .innerHTML = `
            <td>
                <img src="${ curso .imagen }" width="120" />
            </td>
            <td>${ curso .titulo }</td>
            <td>${ curso .precio }</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${ curso .id }" >x</a>
            </td>
        `;

        cursosEnElCarrito .appendChild( filaTabla );        // Insertamos el 'String Template' del curso en el DOM

        
    });
}

// Función que elimina el curso por ID en el LocalStorage
function eliminarCursoLocalStorage( cursoId ) {
    let cursosEnLocalStorage;

    cursosEnLocalStorage = obtenerCursosLocalStorage();         // Obtenemos los Cursos del LocalStorage (Recibe un 'Array')

    // Recorre el 'Array' con los datos del LocalStorage
    cursosEnLocalStorage .forEach( function( curso, index ) {
        // Valida que el ID elegido para eliminar es igual al del 'Array'
        if( curso.id === cursoId ) {
            cursosEnLocalStorage .splice( index, 1 );           // Elimina el valor del indice indicado en el 'Array'
        }
    });

    localStorage .setItem( 'cursos', JSON .stringify( cursosEnLocalStorage ) );   // Convierte el 'Array' a un 'String' y Actualiza los datos en el LocalStorage 
}

// Función que elimina completamente el LocalStorage
function vaciarLocalStorage() {
    localStorage .clear();
}