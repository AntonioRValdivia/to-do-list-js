import { Todo } from "./todo.class"; 

export class TodoList {

  constructor( ){

    this.cargarLocalStorage();                              // Aqui inicia la 1ra parte al cargar el script
    
  }

  nuevoTodo( todo ){
      this.todos.push( todo );
      this.guardarLocalStorage();
  }

  eliminarTodo( id ){
    this.todos = this.todos.filter( todo => todo.id != id);
    this.guardarLocalStorage();

  }

  marcarCompletados( id ){

    for( const todo of this.todos ){
      

      if( todo.id == id ){
          todo.completado = !todo.completado;
          this.guardarLocalStorage();
          break;
      }
    }

  }

  eliminarCompletados(){

    this.todos = this.todos.filter( todo => !todo.completado);
    this.guardarLocalStorage();
      
  }


  // guardarLocalStorage se invocará en cada evento para guardar los cambios en cache
  guardarLocalStorage(){

    localStorage.setItem('todo', JSON.stringify( this.todos ) ); 

  }


  // Esta función recupera los todos guardados en cache, caso contrario un array vacío
  cargarLocalStorage(){

    // if( localStorage.getItem('todo') ){

    //   this.todos = JSON.parse( localStorage.getItem('todo') ) ;

    // }else{
    //   this.todos = [];
    // }
    this.todos = ( localStorage.getItem('todo') )
                     ? JSON.parse( localStorage.getItem('todo') )
                     : []  ;

    this.todos = this.todos.map( obj => Todo.fromJson(obj) );

  }

}