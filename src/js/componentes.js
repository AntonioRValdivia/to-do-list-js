import { Todo } from '../classes';				// Importando clase
import { todoList } from '../index';			// Importando la instancia



// Referencias HTML
const divTodoList 								= document.querySelector('.todo-list');
const txtInput 										= document.querySelector('.new-todo');
const btnBorrarCompletados 				= document.querySelector('.clear-completed');
const ulFilters						 				= document.querySelector('.filters');
const anchorFiltros						 		= document.querySelectorAll('.filtro');



export const crearTodoHtml = ( todo ) =>{

  const htmlTodo = `
  <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
			<div class="view">
				<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
				<label>${ todo.tarea }</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
	</li>`;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append( div.firstElementChild );

  return div.firstElementChild;

}

// Eventos

// Al escribir un nuevo todo
txtInput.addEventListener('keyup', ( event ) => {

	if ( event.keyCode === 13 && txtInput.value.length > 0 ){		// Si presiono enter y lo ingresado es al menos 1 caracter

		console.log(txtInput.value); 									
		const nuevoTodo = new Todo( txtInput.value ); // Instancia de la clase Todo
		todoList.nuevoTodo( nuevoTodo );							// Ingreso el todo al []

		crearTodoHtml( nuevoTodo );
		txtInput.value = '';
	}

});

// checkbox y equis
divTodoList.addEventListener('click', (event) => {

		const nombreElemento = event.target.localName; //input, label, button
		const todoElemento 	 = event.target.parentElement.parentElement; // Todo el bloque desde el <li>, donde esta el id
		const todoId				 = todoElemento.getAttribute('data-id');		//  Guardando el id

		if( nombreElemento.includes('input')){	// click en el check(palomita)

				todoList.marcarCompletados( todoId );
				todoElemento.classList.toggle('completed'); // NOTA: toggle quita o pone una clase según su caso(la invierte)
				// la clase(.classlist) que quito o pongo es 'completed', la que tacha la tarea en pantalla
				// No confundir con la checkbox

		}else if( nombreElemento.includes('button') ){		// hay que borrar el todo(borrando con la x)

			todoList.eliminarTodo( todoId );								// Elimina el todo del array
			divTodoList.removeChild( todoElemento );			 //  Quita la tarea del HTML
		}


});

// borrar completados
btnBorrarCompletados.addEventListener('click', () => {

		// Barre toda la lista buscando los que tengan la clase completed
		todoList.eliminarCompletados();
		for( let i = divTodoList.children.length-1; i >= 0; i--){ 

			const elemento = divTodoList.children[i];				// let i será una variable local que irá disminuyendo
			
			if( elemento.classList.contains('completed') ){
				divTodoList.removeChild( elemento );
			}

		}	

});

// Filtros
ulFilters.addEventListener('click', (event) => {

	const filtro = event.target.text;
	if( !filtro ){ return };

	anchorFiltros.forEach( elem => elem.classList.remove('selected') );		 //Recuadro alrededor de la palabra
	event.target.classList.add('selected');																	

	for( const elemento of divTodoList.children ){

		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch(filtro) {
			
			case 'Pendientes':
				if( completado ){
					elemento.classList.add('hidden');				// Atributo de css que me oculta el elemento
				}
				break;

			case 'Completados':
				if( !completado ){
					elemento.classList.add('hidden');
				}
				break;

		}


	}

});


