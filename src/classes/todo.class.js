

export class Todo {

  static fromJson({ id, tarea, completado, creado }){   // voy a mandar un obj{} y usa desestruct. de {}

    const tempTodo = new Todo(tarea);                  // Crea la instancia de Todo

    tempTodo.id         = id;
    tempTodo.completado = completado;
    tempTodo.creado     = creado ;                    // Me extrae del {} los elementos que deseo 

    return tempTodo;

  }
  // Con el metodo estático anterior recuperamos las instancias de la clase con sus atributos y métodos.

  constructor( tarea ){

    this.tarea = tarea;

    this.id         = new Date().getTime(); // con la hora exacta de la creacion identificaremos la tarea
    this.completado = false;
    this.creado     = new Date();
    
  }

  imprimirClase(){

    console.log(`${this.tarea} - ${this.id}`);

  }

}