function makeItemsDraggable() {
    const draggableItems = document.querySelectorAll(".draggable");
    draggableItems.forEach(item => {
       item.draggable = true;

       item.addEventListener("dragstart", dragStart);
       item.addEventListener("dragover", dragOver);
       item.addEventListener("drop", drop);
    });
    const draggableSubtask = document.querySelectorAll(".draggable-subtask");
    draggableSubtask.forEach(item => {
       item.draggable = true;

       item.addEventListener("dragstart", dragSubtaskStart);
       item.addEventListener("dragover", dragSubtaskOver);
       item.addEventListener("drop", dropSubtask);
    });
 }

 function dragSubtaskStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
 }

 // Function to handle drag over
 function dragSubtaskOver(event) {
    event.preventDefault();
 }

 // Function to handle drop
 function dropSubtask(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedSubtsk = data.split("-");

    const draggedOverSubtask = event.target.id.split('-');

    // Check if dropped item is a subtask

    console.log(draggedSubtsk, draggedOverSubtask);
    var b = todos[draggedSubtsk[0]].subtasks[draggedSubtsk
    [1]];
    todos[draggedSubtsk[0]].subtasks[draggedSubtsk
    [1]] = todos[draggedOverSubtask[0]].subtasks[draggedOverSubtask[1]];
    todos[draggedOverSubtask[0]].subtasks[draggedOverSubtask[1]] = b;
    saveTodos();
    displayTodos(todos);
 }
 // Function to handle drag start
 function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
 }

 // Function to handle drag over
 function dragOver(event) {
    event.preventDefault();
 }

 // Function to handle drop
 function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");

    const draggableItem = document.getElementById(data);
    // Check if dropped item is a subtask
    const isSubtask = event.target.parentElement.className == "li draggable";
    // console.log(data, event.target.parentElement, event.target.parentElement.className);
    if (isSubtask) {
       var b = todos[data];
       todos[data] = todos[event.target.parentElement.id];
       todos[event.target.parentElement.id] = b;
       saveTodos();
       displayTodos(todos);
    }
 }

 // Call the makeItemsDraggable function when the page loads
 window.addEventListener("load", makeItemsDraggable);
