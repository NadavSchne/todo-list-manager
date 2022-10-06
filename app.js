//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
// todoButton.addEventListener("click", addTodo);
// todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("click", filterTodo);
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    console.log("hello");

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //adding li to div
    todoDiv.appendChild(newTodo);

    // add todo value to local storage
    saveLovalTodos(todoInput.value);

    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check" ></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa fa-trash" ></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    //append to list;
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // console.log(item.parentElement.classList);
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLovalTodos(todo)
{
    
    let todos;
    if(localStorage.getItem('todos')===null)// check if i have "todos" in storage
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem('todos'));// get todos from DB
    
    todos.push(todo); // insert new todo into array 
    localStorage.setItem('todos', JSON.stringify(todos))// set updated array into local storage
    
}

function getTodos()
{
    let todos;
    if(localStorage.getItem('todos')===null)// check if i have "todos" in storage
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem('todos'));// get todos from DB
    

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    //adding li to div
    todoDiv.appendChild(newTodo);


    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check" ></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa fa-trash" ></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    
    //append to list;
    todoList.appendChild(todoDiv);
    })
}
//

function removeLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null)// check if i have "todos" in storage
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem('todos'));// get todos from DB
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

