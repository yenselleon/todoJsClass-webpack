import { Todo } from '../class/todo.class';
import { TodoList } from '../class/todo_list.class';
import '../css/componentes.css';

const ulTodoList = document.querySelector('.todo-list');
const newTodoInput = document.querySelector('.new-todo');
const todoList = new TodoList()
const footer = document.querySelector('.footer');
const todoCount = document.querySelector('.todo-count');




export const crearTodoListHtml = (todo) => {

    const htmlBody = `
        <li data-id=${todo.id} class=${(todo.completado) ? 'completed' : ''}>
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlBody;

    ulTodoList.append(div.firstElementChild);
}

//eventos

newTodoInput.addEventListener('keyup', (event) =>{

    //capturar teclas pulsadas y generar todo al presionar enter
    if(event.keyCode === 13 && event.target.value.length > 0 ){

        const newTodo = new Todo(event.target.value)
        todoList.crearTarea(newTodo);

        crearTodoListHtml(newTodo)
        event.target.value = '';
    }
    
})

ulTodoList.addEventListener('click', (event)=> {
    const targetClassElement = event.target.className;
    const idTodo = event.target.parentNode.parentNode.dataset.id;

    //agregar clase completed
    if(targetClassElement.includes('toggle')){
        event.target.parentNode.parentNode.classList.toggle('completed')
        todoList.tareaCompletada(idTodo);
        
    }
    
    //Eliminar tarea
    if(targetClassElement.includes('destroy')){
        event.target.parentNode.remove(event.target.parentNode)
        
        todoList.eliminarTarea(idTodo)
        
    }

    console.log(todoList)

})

footer.addEventListener('click', (event)=> {
    const targetClassElement = event.target.className;

    //eliminar tareas completadas
    if(targetClassElement.includes('clear-completed')){
        const nodeListTodo = [...ulTodoList.children];

        
        nodeListTodo.map(e => console.log(e))
    }

    console.log(targetClassElement)
})



