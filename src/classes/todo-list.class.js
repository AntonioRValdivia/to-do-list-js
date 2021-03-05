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


  // Ésta funcion se invocará en cada evento para guardar los cambios en cache
  guardarLocalStorage(){

    localStorage.setItem('todo', JSON.stringify( this.todos ) ); // transforma el obj{}js en un json string
  
    // Ésto es necesario porque no se pueden guardar objetos en localStorage, forzosamente deben ser strings

  }


  // Esta función recupera los todos guardados en cache, caso contrario un array vacío
  cargarLocalStorage(){
    // if( localStorage.getItem('todo') ){                            // Usando if
    //   this.todos = JSON.parse( localStorage.getItem('todo') ) ;
    // }else{
    //   this.todos = [];
    // }                                                   

    this.todos = ( localStorage.getItem('todo') )                  // Usando ternario
                     ? JSON.parse( localStorage.getItem('todo') ) // El json string a obj{}js
                     : []  ;

    this.todos = this.todos.map( obj => Todo.fromJson(obj) );
    // Recuperamos todo el obj{} pero no se recuperan los métodos, tal y como deberían ser las instancias
    //Hacemos uso del método fromJson() de la clase Todo para que se recreen las instancias

    // Con el método map barre todo el array (si había) y cada elemento lo pasa por el método fromJson()
    // Y me regresa un nuevo array con las instancias.
  }                                                        
                                                   
}
          