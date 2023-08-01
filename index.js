
   const priorityMapping = {
      "1": "low",
      "2": "medium",
      "3": "high"
   };
   let subtasks = [];
   let tags = [];

   function addSubtaskEnter(event) {
      if (event.key === 'Enter') {
         addSubtask();
      }
   }

   function addSubtask() {
      const subtaskInput = document.getElementById("subtask");
      const subtask = subtaskInput.value;
      if (subtask == '') return;
      subtasks.push({ subtask, completed: false, completed_at: null });
      renderSubtask();
      subtaskInput.value = "";
   }
   function addTagEnter(event) {
      if (event.key === 'Enter') {
         addTagtask();
      }
   }

   function addTagtask() {
      const tagInput = document.getElementById("tags");
      const tag = tagInput.value;
      if (tag == '') return;
      tags.push(tag);
      renderTagtask();
      tagInput.value = "";
   }

   function openModel() {
      var model = document.getElementById("model");
      model.style.display = "block";
   }

   function renderSubtask() {
      const subtaskText = document.getElementById("subtask_name");
      subtaskText.innerHTML = "";
      subtasks.forEach((subtask, index) => {
         console.log(subtask)
         const element = document.createElement('li');
         element.classList = "tag-container";
         element.innerText = subtask.subtask;
         const crossSpan = document.createElement('span');
         crossSpan.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
         crossSpan.addEventListener('click', () => removeSubTask(index));

         subtaskText.appendChild(element);
         subtaskText.appendChild(crossSpan);
      });
   }

   function removeSubTask(id) {

      subtasks.splice(id, 1);
      renderSubtask();

   }

   function renderTagtask() {
      const subtaskText = document.getElementById("tag_name");
      subtaskText.innerHTML = "";
      tags.forEach((tag, index) => {
         const element = document.createElement('li');
         element.classList = "tag-container tag";
         element.innerText = tag;
         const crossSpan = document.createElement('span');
         crossSpan.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
         crossSpan.addEventListener('click', () => removeTagTask(index));
         subtaskText.appendChild(element);
         subtaskText.appendChild(crossSpan);
      });
   }

   function removeTagTask(id) {

      tags.splice(id, 1);
      renderTagtask();

   }
   function closeModel() {
      var model = document.getElementById("model");
      model.style.display = "none";
      todoInput.value = "";
      subtasks = [];
      tags = [];
      dueDateInput.value = new Date(0);
      reminderDateInput.value = new Date(0);

      const subtaskText = document.getElementById("subtask_name");
      subtaskText.innerHTML = "";
      const tagText = document.getElementById("tag_name");
      tagText.innerHTML = "";
   }

   function reset() {
      displayTodos(todos);
   }

   let todos = JSON.parse(localStorage.getItem("todos")) || [];
   let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];
   let editIndex = -1;
   let subEditIndex = -1;
   let todoForm = document.querySelector(".input-section");
   let todoInput = document.querySelector("#todoInput");
   let todoList = document.querySelector(".todo-list");
   let addButton = document.querySelector("#addBtn");
   let todo_main = document.querySelector(".todos");
   let searchBy = document.getElementById("search_by");
   let searchInput = document.getElementById("search-input");
   let searchButton = document.getElementById("search-button");
   let prioritySelect = document.getElementById("prioritySelect");
   let categorySelect = document.getElementById("categorySelect");
   let dueDateInput = document.getElementById("dueDate");
   let reminderDateInput = document.getElementById("reminderDate");

   function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
   }
   function saveActivityLog() {
      localStorage.setItem("activityLog", JSON.stringify(activityLog));
   }

   // Function to sort todos based on selected criteria
   function sortTodos() {
      const sortingCriteria = document.getElementById("sort_sorting").value;
      let sortedTodos = [];

      if (sortingCriteria === "none") {
         // If no sorting criteria selected, show all todos
         sortedTodos = todos;
      } else if (sortingCriteria === "dueDate") {
         // Sort todos by due date
         sortedTodos = todos.slice().sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      } else if (sortingCriteria === "priority") {
         // Sort todos by priority (assuming priority is represented as a numerical value, e.g., 1 for low, 2 for medium, 3 for high)
         sortedTodos = todos.slice().sort((a, b) => a.priority - b.priority);
      }

      // Display the sorted todos in the todo list
      displayTodos(sortedTodos);
   }

   
   function showActivityLog() {
      todoList.innerHTML = "";

      activityLog.forEach((activity, index) => {

         const li = document.createElement("li");
         li.className = "li";
         li.setAttribute('id', index);
         const spanText = document.createElement("span");
         spanText.className = "todo-text";
         spanText.id = 'todoText';
         spanText.innerHTML = activity;
         li.appendChild(spanText);
         todoList.appendChild(li);

      });

   }
   // Function to view backlogs (pending or missed tasks)
   function viewBacklogs() {
      const backlogTodos = todos.filter(todo => todo.completed != true);

      // Display the backlogs in the todo list
      displayTodos(backlogTodos);
   }


   function displayFilteredTodos() {

      // Clear existing todos from the list
      todoList.innerHTML = "";

      // Get the selected filter values
      let categoryFilter = document.getElementById("filter_category").value;
      let priorityFilter = document.getElementById("filter_priority").value;
      let fromDueFilter = document.getElementById("fromDueDate").value;
      let toDueFilter = document.getElementById("toDueDate").value;
      // console.log(fromDueFilter,toDueFilter);

// var check = new Date(c[0], parseInt(c[1])-1, c[0]);


      // Filter todos based on the selected filters

      const filteredTodos = todos.filter(todo => {
         if(fromDueFilter && toDueFilter){
            var d1 = fromDueFilter.split("-");
            var d2 = toDueFilter.split("-");
            
                console.log(fromDueFilter,toDueFilter,todo.due_date);
            var from = new Date(d1[0], parseInt(d1[1])-1, d1[2]);  // -1 because months are from 0 to 11
            var to   = new Date(d2[0], parseInt(d2[1])-1, d2[2]);
            var c = todo.due_date.split("-");
            var check = new Date(c[0], parseInt(c[1])-1, c[2]);
            return check > from && check < to;
         }

         // const dueDateMatch = fromDueFilter && toDueFilter || (check > from && check < to);
         const categoryMatch = categoryFilter === "all" || todo.category === categoryFilter;
         const priorityMatch = priorityFilter === "all" || todo.priority === priorityFilter;
         return categoryMatch && priorityMatch;
      });

      displayTodos(filteredTodos);
   }


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
      const isSubtask = event.target.className === "li draggable";
      console.log(data,isSubtask,event.target.className,event.target.id)
      // console.log(data, event.target.parentElement, event.target.parentElement.className);
      if (isSubtask) {
         var b = todos[data];
         todos[data] = todos[event.target.id];
         todos[event.target.id] = b;
         saveTodos();
         displayTodos(todos);
      }
   }


   window.addEventListener("load", makeItemsDraggable);

   function parseDueDate(dueDateStr) {

    console.log(dueDateStr);
      // Check if the due date is "today"
      if (dueDateStr.toLowerCase() === "today") {
         return new Date().toISOString().split['T'][0];;
      }

      // Check if the due date is "tomorrow"
      if (dueDateStr.toLowerCase() === "tomorrow") {
         const tomorrow = new Date();
         tomorrow.setDate(tomorrow.getDate() + 1).toISOString().split['T'][0];;
         return tomorrow;
      }

      const parsedDate = new Date(dueDateStr);
      return parsedDate;
   }
   function addTodo() {
      // const dueDateMatch = todoText.match(/\b(?:tomorrow|today|\d{1,2}(?:st|nd|rd|th)? (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}(?: \d{1,2}(?::\d{2})? [ap]m)?)\b/i);


     
      // if (dueDateMatch) {
      //    // If due date is found, convert it to a date object
      //    dueDate = parseDueDate(dueDateMatch[0]).toISOString();
      //    console.log(dueDate);
      // }
      // console.log(todoTextWithoutDate, dueDate);
    
      const todoText = todoInput.value.trim();
      // todoForm.addEventListener("click", function (event) {
      //    event.preventDefault()
      // });
      console.log(dueDateInput.value);
      if (todoText == '' || dueDateInput.value=='' ) return;
      if (todoText == '' && editIndex == -1) return ;
      
      console.log(dueDateInput.value);
      // Remove the due date from the todo text
      // const todoTextWithoutDate = dueDateMatch ? todoText.replace(dueDateMatch[0], '').trim() : todoText;
      if (editIndex === -1) {
         todos.unshift({
            title: todoText,
            completed: false,
            priority: prioritySelect.value,
            category: categorySelect.value,
            due_date: dueDateInput.value,
            reminder_date: reminderDateInput.value,
            subtasks: subtasks,
            tags:tags
         });
         activityLog.unshift(`Task: ${todoText} added at ${new Date().toISOString().split('T')[0]}`);
         saveActivityLog();
      } else {
         todos[editIndex].title = todoText;
         todos[editIndex].priority = prioritySelect.value;
         todos[editIndex].category = categorySelect.value;
         todos[editIndex].due_date = dueDateInput.value;
         todos[editIndex].reminder_date = reminderDateInput.value;
         todos[editIndex].tags=tags;
            editIndex = -1;
         addButton.style.display = "inline";
         activityLog.unshift(`Task: ${todoText} edited at ${new Date().toISOString().split('T')[0]}`);
         saveActivityLog();
      }
      todoInput.value = "";
      subtasks = [];
      tags = [];
      prioritySelect.value = '1';
      categorySelect.value = 'development';
      
      dueDateInput.value ="";
      
      saveTodos();
     
      renderSubtask();
      displayTodos(todos);
      closeModel();
   }

   function updateSubTask(id,index) {
      var elements = document.getElementById(`${id}-${index}`);
      // console.log(elements)
      if(subEditIndex!=''){
         let editSubInput = elements.querySelector('#subEditInput');
         // console.log(todos[id]);
         todos[id].subtasks[index].subtask = editSubInput.value;
      }
      // console.log(todos);
      saveTodos();
      displayTodos(todos);
   }

   function editTodo(id) {
      openModel();
      todoInput.value = todos[id].title;

      prioritySelect.value = todos[id].priority;
      categorySelect.value = todos[id].category;
      dueDateInput.value = todos[id].due_date;
      reminderDateInput.value = todos[id].reminder_date;
      subtasks = todos[id].subtasks;
      tags = todos[id].tags;
      renderSubtask();
      renderTagtask();
      editIndex = id;
   }

   function editSubTask(id, index) {
      var elements = document.getElementById(`${id}-${index}`);
      let editButton = elements.querySelector('#subEditButton');
      editButton.style.display = 'none';
      let updateButton = elements.querySelector('#subUpdateButton');
      updateButton.style.display = 'block';
      let taskTitle = elements.querySelector('#subText');
      taskTitle.style.display = 'none';
      let editInput = elements.querySelector('#subEditInput');
      editInput.style.display = 'block';
      let deleteButton = elements.querySelector('#subDeleteButton');
      deleteButton.style.display = 'none';
      subEditIndex = `${id}-${index}`;
   }
   function toggleTodoCompleted(id) {
      todos[id].completed = !todos[id].completed;
      todos[id].completed_at = new Date().toISOString().split('T')[0];
      activityLog.unshift(`Task: ${todos[id].title} mark completed at ${todos[id].completed_at}`);
      saveActivityLog();
      saveTodos();
      displayTodos(todos);
   }
   function toggleSubTaskCompleted(id, index) {
      console.log(id, index);
      todos[id].subtasks[index].completed = !todos[id].subtasks[index].completed;
      todos[id].subtasks[index].completed_at = new Date().toISOString().split('T')[0];
      activityLog.unshift(`Subtask: ${todos[id].subtasks[index].subtask} of task ${todos[id].title} mark completed at ${todos[id].subtasks[index].completed_at}`);
      saveActivityLog();
      saveTodos();
      displayTodos(todos);
   }
   function deleteTodo(id) {
      activityLog.unshift(`Task:${todos[id].title} deleted at ${new Date().toISOString().split('T')[0]}`);
      saveActivityLog();
      todos.splice(id, 1);
      saveTodos();
      displayTodos(todos);
   }
   function deleteSubTask(id, index) {
      activityLog.unshift(`Subtask: ${todos[id].subtasks[index].subtask} of task ${todos[id].title} deleted at ${new Date().toISOString().split('T')[0]}`);
      saveActivityLog();
      todos[id].subtasks.splice(index, 1);
      saveTodos();
      displayTodos(todos);
   }
   function searchTodo() {
      const searchQuery = searchInput.value.trim();
      if (searchQuery !== "") {
         if (searchBy.value === 'title') {
            const searchResults = todos.filter((todo) =>
               todo.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            displayTodos(searchResults);
         } else if (searchBy.value === 'subtask') {
            const searchSubTaskResults = [];

               todos.forEach((todo) => {
                  todo.subtasks.forEach((subtask)=>{
                     if(subtask.subtask.toLowerCase().includes(searchQuery.toLowerCase())){
                        searchSubTaskResults.push(todo);
                     }
                  });
               })
            displayTodos(searchSubTaskResults);
         } else if(searchBy.value === 'tag'){
            const searchSubTaskResults = [];
   
            todos.forEach((todo) => {
               todo.tags.forEach((tag)=>{
                  if(tag.toLowerCase().includes(searchQuery.toLowerCase())){
                     searchSubTaskResults.push(todo);
                  }
               });
            })
         displayTodos(searchSubTaskResults);
         }

      }else {
         displayTodos(todos);
      }
      searchInput.value =''
   }
   addButton.addEventListener("click", addTodo);
   searchButton.addEventListener("click", searchTodo);

