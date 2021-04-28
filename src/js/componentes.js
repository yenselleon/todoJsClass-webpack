import { Todo } from '../class/todo.class';
import { TodoList } from '../class/todo_list.class';
import '../css/componentes.css';

const ulTodoList = document.querySelector('.todo-list');
const newTodoInput = document.querySelector('.new-todo');
const todoList = new TodoList()
const footer = document.querySelector('.footer');
const todoCount = document.querySelector('.todo-count');
const footerFilters = document.querySelectorAll('.filtro');
const arrowLabelInput = document.querySelector('.arrow');


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
    counChildUlNodeElement()
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
        
        
        updatedStateOfTodoList()
        countTodo();
        
    }
    
    //Eliminar tarea
    if(targetClassElement.includes('destroy')){
        event.target.parentNode.parentNode.remove(event.target.parentNode);
        
        todoList.eliminarTarea(idTodo);
        counChildUlNodeElement();
        countTodo();

    }


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

        counChildUlNodeElement()

    }

    //filtrar todoList mediante btn de 
    if(targetClassElement.includes('filtro')){
        const nodeListTodo = [...ulTodoList.children];

        clearClassAndAddSelected(event.target.innerText)
        
        updatedStateOfTodoList()

        

    }

})

//eventos flecha input toggle-all para seleccionar todos los todos
arrowLabelInput.addEventListener('click', ()=> {
    const arraLiTodoList = [...ulTodoList.children];
    let isEveryPending = arraLiTodoList.every( e => e.className.includes('completed') === false);
    let isEveryCompleted = arraLiTodoList.every( e => e.className.includes('completed') === true);

    arraLiTodoList.map(e => {
        
        todoList.tareaCompletada(e.dataset.id);

        if (isEveryCompleted) {
            e.classList.toggle('completed');   
            e.children[0].childNodes[1].checked=0;
        }
        else if (isEveryPending ) {
            e.classList.toggle('completed')
            e.children[0].childNodes[1].checked=1;
        }
        else if (!isEveryPending && !isEveryCompleted ) {
            (!e.className.includes('completed')) && e.classList.toggle('completed');
            e.children[0].childNodes[1].checked=1;
        };
    })
    
    updatedStateOfTodoList();
    countTodo();
})




/*------------------------------------------*/
/*--Funtion Helpers--*/
/*------------------------------------------*/

//helper Contar pendientes y completados
function countTodo() {
    /*------------------------------------------*/
    /*--Count Todo--*/
    /*------------------------------------------*/
    const nodeListTodo = [...ulTodoList.children];
    const filterPendingTodo = nodeListTodo.filter( e => (!e.className.includes('completed')) && e );
    const filterListCompletedTodo = nodeListTodo.filter( e => (e.className.includes('completed')) && e );
    const clearAllCompletedBtn = document.querySelector('.clear-completed');
    

    todoCount.firstChild.innerText = filterPendingTodo.length;
    
    (filterListCompletedTodo.length >= 1)
                                        ? clearAllCompletedBtn.classList.remove('hidden')
                                        : clearAllCompletedBtn.classList.add('hidden')
}



//Helper Btn: limpia la clase de los btn que tengan la clase selected y añade la clase al boton pulsado
function clearClassAndAddSelected(innerTextBtnSelected) {
    const arrFooterFilters = Array.from(footerFilters)

    arrFooterFilters.map(e => {
        e.classList.remove('selected');
        (e.innerText === innerTextBtnSelected) && e.classList.add('selected');
    });
}


//Helper actualizar el estado completado o no completado del todo para que sean filtrados por los btn del footer
function updatedStateOfTodoList(){
    const nodelistado = [...ulTodoList.children]
    const btnFiltrosFooter = [...footerFilters]

    nodelistado.forEach(e => (e.className.includes('hidden') && e.classList.remove('hidden')))

    const btnfilter = btnFiltrosFooter.filter( e => {
        return (e.className.includes('selected')) && e
    })
    
    
    nodelistado.map( e => {
        (btnfilter[0].innerText === 'Completados') && ((!e.className.includes('completed')) && e.classList.add('hidden'));
        (btnfilter[0].innerText === 'Pendientes') && ((e.className.includes('completed')) && e.classList.add('hidden'));
    })
    
}

// helper 

function counChildUlNodeElement() {
    let count =  ulTodoList.childElementCount;

    if(count >= 1){

        arrowLabelInput.classList.remove('hidden')
        footer.classList.remove('hidden')
    }else{
        arrowLabelInput.classList.add('hidden')
        footer.classList.add('hidden')
    }

}