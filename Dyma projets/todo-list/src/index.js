import "./style.css";

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');

const todos =[
    {
        text: "Je suis todo False",
        done: false,
        editMode: true,
    },
    {
        text: "Je suis todo True",
        done: true,
        editMode: false,
    }
];

form.addEventListener("submit", event => {
    event.preventDefault();
    const value = input.value;
    input.value = '';

    if(value === ''){
        input.placeholder = "Veuiller remplir le champ...";
        input.classList.add("border-danger");
    }else{
        addTodo(value);
        input.placeholder = "";
        input.classList.remove("border-danger");
    }
});

const displayTodo = () => {
    const todosNode = todos.map((todo, index) => {
        if(todo.editMode){
            return createTodoEditElement(todo, index);
        }else{
            return createTodoElement(todo, index);
        }
    });
    ul.innerHTML = '';
    ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
    const li = document.createElement('li');
    const buttonDelete = document.createElement('button');
    const buttonEdit = document.createElement('button');
    const todoTxt = document.createElement('p');
    
    buttonEdit.innerHTML = "Modifier";
    buttonEdit.classList.add("bg-primary", "txt-white");
    buttonDelete.innerHTML = "Supprimer";
    buttonDelete.classList.add("bg-danger", "txt-white");
    todoTxt.innerHTML = todo.text;
    todoTxt.classList.toggle("line", todo.done === true);
    
    li.innerHTML = `
        <span class="todo ${todo.done ? 'done' : ''}"></span>
    `;
    li.append(todoTxt, buttonEdit, buttonDelete);

    buttonDelete.addEventListener("click", event => {
        event.stopPropagation();
        deleteTodo(index);
    });
    li.addEventListener("click", event => {
        toggleTodo(index);
    });
    buttonEdit.addEventListener("click", event => {
        event.stopPropagation();
        toggleEditMode(index);
    });
    todoTxt.addEventListener("dblclick", event => {
        toggleEditMode(index);
    });

    return li;
};

const createTodoEditElement = (todo, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const buttonSave = document.createElement('button');
    const buttonCancel = document.createElement('button');

    input.type = "text";
    input.value = todo.text;
    buttonSave.innerHTML = "Sauvegarder";
    buttonSave.classList.add("bg-success", "txt-white");
    buttonCancel.innerHTML = "Annuler";
    buttonCancel.classList.add("bg-danger", "txt-white");
    li.append(input, buttonCancel, buttonSave);
    
    buttonSave.addEventListener("click", event => {
        editTodo(index, input);
    });
    buttonCancel.addEventListener("click", event => {
        event.stopPropagation();
        toggleEditMode(index);
    });
    input.addEventListener("keyup", event => {
        if(event.key === "Enter"){
            editTodo(index, input);
        };
        if(event.key === "Escape"){
            toggleEditMode(index);
        };
    });

    return li;
};

// Mettre la la première lettre en majuscule.
const strUcFirst = (a) => {
    a = a.trim();
    return (a+'').charAt(0).toUpperCase()+a.substr(1);
}

const addTodo = (text) => {
    const test = strUcFirst(text);

    todos.push(
        {
            text: test,
            done: false
        });
    displayTodo();
};

const deleteTodo = index => {
    todos.splice(index, 1);
    displayTodo();
};

const toggleTodo = index => {
    todos[index].done = !todos[index].done;
    displayTodo();
};

const editTodo = (index, input) => {
    todos[index].text = strUcFirst(input.value);
    todos[index].editMode = false;
    displayTodo();
};

const toggleEditMode = index => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

displayTodo();