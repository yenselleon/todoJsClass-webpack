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

    countTodo();
    
}

//eventos input new todo
newTodoInput.addEventListener('keyup', (event) =>{

    //capturar teclas pulsadas y generar todo al presionar enter
    if(event.keyCode === 13 && event.target.value.length > 0 ){

        const newTodo = new Todo(event.target.value)
        todoList.crearTarea(newTodo);

        crearTodoListHtml(newTodo)
        event.target.value = '';
    }
    
})


//Eventos todoList
ulTodoList.addEventListener('click', (event)=> {
    const targetClassElement = event.target.className;
    const idTodo = event.target.parentNode.parentNode.dataset.id;

    //agregar clase completed
    if(targetClassElement.includes('toggle')){
        event.target.parentNode.parentNode.classList.toggle('completed')
        todoList.tareaCompletada(idTodo);
        
        countTodo();
    }
    
    //Eliminar tarea
    if(targetClassElement.includes('destroy')){
        event.target.parentNode.parentNode.remove(event.target.parentNode);
        
        todoList.eliminarTarea(idTodo);
        countTodo();
    }

    console.log(todoList)

})


//Eventos footer
footer.addEventListener('click', (event)=> {
    const targetClassElement = event.target.className;

    //eliminar todas las tareas completadas
    if(targetClassElement.includes('clear-completed')){
        const nodeListTodo = [...ulTodoList.children];

        
        nodeListTodo.map(e => {
            (e.className === 'completed') && e.remove(e); 
            (e.className === 'completed') && todoList.eliminarTarea(e.dataset.id);
        })
    }

    console.log(targetClassElement)
})


//function helpers

function countTodo() {
    /*------------------------------------------*/
    /*--Count Todo--*/
    /*------------------------------------------*/
    const nodeListTodo = [...ulTodoList.children];

    const filterListCompletedTodo = nodeListTodo.filter( e => e.className != 'completed' )

    todoCount.firstChild.innerText = filterListCompletedTodo.length
}
