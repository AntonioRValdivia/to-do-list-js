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

txtInput.addEventListener('keyup', ( event ) => {

	if ( event.keyCode === 13 && txtInput.value.length > 0 ){		// Si presiono enter y lo ingresado es al menos 1 caracter

		console.log(txtInput.value); 									
		const nuevoTodo = new Todo( txtInput.value ); // Instancia de la clase Todo
		todoList.nuevoTodo( nuevoTodo );							// Ingreso el todo al []

		crearTodoHtml( nuevoTodo );
		txtInput.value = '';
	}

});

divTodoList.addEventListener('click', (event) => {

		const nombreElemento = event.target.localName; //input, label, button
		const todoElemento 	 = event.target.parentElement.parentElement; // Todo el bloque desde el <li>, donde esta el id
		const todoId				 = todoElemento.getAttribute('data-id');		//  Guardando el id

		if( nombreElemento.includes('input')){	// click en el check(palomita)

				todoList.marcarCompletados( todoId );
				todoElemento.classList.toggle('completed');

		}else if( nombreElemento.includes('button') ){		// hay que borrar el todo(borrando con la x)

			todoList.eliminarTodo( todoId );
			divTodoList.removeChild( todoElemento );
		}


});


btnBorrarCompletados.addEventListener('click', () => {

		todoList.eliminarCompletados();
		for( let i = divTodoList.children.length-1; i >= 0; i--){

			const elemento = divTodoList.children[i];
			
			if( elemento.classList.contains('completed') ){
				divTodoList.removeChild( elemento );
			}

		}	

});

ulFilters.addEventListener('click', (event) => {

	const filtro = event.target.text ;
	if( !filtro ){ return };

	anchorFiltros.forEach( elem => elem.classList.remove('selected') );
	event.target.classList.add('selected');

	for( const elemento of divTodoList.children ){

		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch(filtro) {
			
			case 'Pendientes':
				if( completado ){
					elemento.classList.add('hidden');
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


