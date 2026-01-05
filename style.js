document.addEventListener("DOMContentLoaded", function () {
  let todoItemsContainer = document.getElementById("todoItemsContainer");
  let addTodoButton = document.getElementById("addTodoButton");
  let saveTodoButton = document.getElementById("saveTodoButton");

  function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    return parsedTodoList === null ? [] : parsedTodoList;
  }

  let todoList = getTodoListFromLocalStorage();
  let todosCount = todoList.length;

  saveTodoButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
      alert("Enter Valid Text");
      return;
    }

    todosCount += 1;

    let newTodo = {
      text: userInputValue,
      uniqueNo: todosCount,
      isChecked: false,
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
  }

  addTodoButton.onclick = function () {
    onAddTodo();
  };

  function onTodoStatusChange(checkboxId, labelId, todoId) {
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let index = todoList.findIndex(
      (eachTodo) => "todo" + eachTodo.uniqueNo === todoId
    );

    if (index > -1) {
      todoList[index].isChecked = !todoList[index].isChecked;
    }
  }

  function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let index = todoList.findIndex(
      (eachTodo) => "todo" + eachTodo.uniqueNo === todoId
    );

    if (index > -1) {
      todoList.splice(index, 1);
    }
  }

  function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function () {
      onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if (todo.isChecked) {
      labelElement.classList.add("checked");
    }
    todoElement.appendChild(labelElement);

    let deleteIcon = document.createElement("button");
    deleteIcon.textContent = "Delete";
    deleteIcon.onclick = function () {
      onDeleteTodo(todoId);
    };
    todoElement.appendChild(deleteIcon);
  }

  for (let todo of todoList) {
    createAndAppendTodo(todo);
  }
});
