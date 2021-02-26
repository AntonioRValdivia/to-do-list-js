import './styles.css';                                  // Importación de los estilos globales

import { TodoList } from './classes';                  // Importación del documento global de las clases
import { crearTodoHtml } from './js/componentes';      // Importación de la función

export const todoList = new TodoList();                // Exportando la instancia de la clase

todoList.todos.forEach( todo => crearTodoHtml( todo ) );  // cargando en pantalla los todos que se recuperaron del localStorage








//Ejemplo de como funcionan localStorage y sessionStorage

// localStorage.setItem('mi-key', 'ABC1234');
// sessionStorage.setItem('mi-key', 'ABC1235');


// setTimeout( () => {                        // Usando un timer para ver como eliminar un dato de localStorag

//   localStorage.removeItem('mi-key');

// }, 1500);

















