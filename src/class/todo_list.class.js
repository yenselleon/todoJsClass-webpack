


export class TodoList {

    constructor (){

        this.todos = [];

    }


    crearTarea(todo) {

        this.todos.push(todo);
    }


    eliminarTarea(id) {
        
        this.todos = this.todos.filter( e => e.id != id )
        
    }

    tareaCompletada(id) {
        this.todos.map( e => {
            (e.id == id) && (e.completado = !e.completado);
            
        });

    }

}