
   const priorityMapping = {
      "1": "low",
      "2": "medium",
      "3": "high"
   };
   // Function to open the model
   let subtasks = [];

   function addSubtaskEnter(event) {
      if (event.key === 'Enter') {
         addSubtask();
      }
   }

   function addSubtask() {
      const subtaskInput = document.getElementById("subtask");
      const subtask = subtaskInput.value;
      if (subtask == '') return;
      const subtaskText = document.getElementById("subtask_name");

      const element = document.createElement('li');
      element.className = "tag-container";
      element.innerText = subtask;
      element.addEventListener('click', () => removeSubTask(subtasks.length));
      subtaskText.appendChild(element);
      // Add the subtask to the subtasks array
      subtasks.push({ subtask, completed: false, completed_at: null });

      // Clear the subtask input field
      subtaskInput.value = "";
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

         // </span>  click = "${() => removeSubTask(index)}"></i>`;
         crossSpan.addEventListener('click', () => removeSubTask(index));

         subtaskText.appendChild(element);
         subtaskText.appendChild(crossSpan);
      });
   }

   function removeSubTask(id) {

      subtasks.splice(id, 1);
      renderSubtask();

   }
   // Function to close the model
   function closeModel() {
      var model = document.getElementById("model");
      model.style.display = "none";
   }

   function reset() {
      displayTodos(todos);
   }

   let todos = JSON.parse(localStorage.getItem("todos")) || [];
   let activityLog = JSON.parse(localStorage.getItem("activityLog")) || [];
   let editIndex = -1;
   let subEditIndex = -1;
   const todoForm = document.querySelector(".input-section");
   const todoInput = document.querySelector("#todoInput");
   const todoList = document.querySelector(".todo-list");
   const addButton = document.querySelector("#addBtn");
   const todo_main = document.querySelector(".todos");
   const searchBy = document.getElementById("search_by");
   const searchInput = document.getElementById("search-input");
   const searchButton = document.getElementById("search-button");
   const prioritySelect = document.getElementById("prioritySelect");
   const categorySelect = document.getElementById("categorySelect");
   const dueDateInput = document.getElementById("dueDate");
   const reminderDateInput = document.getElementById("reminderDate");

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

   // Function to display todos in the todo list
  

   function showActivityLog() {
      todoList.innerHTML = "";

      activityLog.forEach((activity, index) => {

         const li = document.createElement("li");
         li.className = "li";
         li.setAttribute('id', index);
         const spanText = document.createElement("span");
         spanText.className = "todo-text";
         spanText.id = 'todoText';
         // todoText = activity;
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
      const categoryFilter = document.getElementById("filter_category").value;
      const priorityFilter = document.getElementById("filter_priority").value;

      // Filter todos based on the selected filters
      const filteredTodos = todos.filter(todo => {
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

   // Call the makeItemsDraggable function when the page loads
   window.addEventListener("load", makeItemsDraggable);

   function parseDueDate(dueDateStr) {
      // Use any date parsing library or custom logic here to convert due date string to date object
      // For simplicity, we'll use JavaScript's Date object for basic date parsing
    console.log(dueDateStr);
      // Check if the due date is "today"
      if (dueDateStr.toLowerCase() === "today") {
         return new Date();
      }

      // Check if the due date is "tomorrow"
      if (dueDateStr.toLowerCase() === "tomorrow") {
         const tomorrow = new Date();
         tomorrow.setDate(tomorrow.getDate() + 1);
         return tomorrow;
      }

      // Parse date using JavaScript Date object (for example, for date format "13th Jan 2023 3 pm")
      const parsedDate = new Date(dueDateStr);
      return parsedDate;
   }
   function addTodo() {
      const todoText = todoInput.value.trim();
      todoForm.addEventListener("click", function (event) {
         event.preventDefault()
      });
      const dueDateMatch = todoText.match(/\b(?:tomorrow|today|\d{1,2}(?:st|nd|rd|th)? (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}(?: \d{1,2}(?::\d{2})? [ap]m)?)\b/i);

      let dueDate;
      if (dueDateMatch) {
         // If due date is found, convert it to a date object
         dueDate = parseDueDate(dueDateMatch[0]);
      }
      console.log(dueDate);
      // Remove the due date from the todo text
      const todoTextWithoutDate = dueDateMatch ? todoText.replace(dueDateMatch[0], '').trim() : todoText;
      // console.log(todoTextWithoutDate, dueDate);

      if (todoText == '' && editIndex == -1) return false;

    //   if (editIndex === -1) {
    //      todos.unshift({
    //         title: todoTextWithoutDate,
    //         completed: false,
    //         priority: prioritySelect.value,
    //         category: categorySelect.value,
    //         due_date: dueDate,
    //         reminder_date: reminderDateInput.value,
    //         subtasks: subtasks
    //      });
    //      activityLog.push(`${todoTextWithoutDate} added at ${new Date().toISOString().split('T')[0]}`);
    //      saveActivityLog();
    //   } else {
    //      todos[editIndex].title = todoTextWithoutDate;
    //      todos[editIndex].priority = prioritySelect.value;
    //      todos[editIndex].category = categorySelect.value;
    //      todos[editIndex].due_date = dueDateInput.value;
    //      todos[editIndex].reminder_date = reminderDateInput.value,
    //         editIndex = -1;
    //      addButton.style.display = "inline";
    //      activityLog.push(`${todoTextWithoutDate} edited at ${new Date().toISOString().split('T')[0]}`);
    //      saveActivityLog();
    //   }
    //   todoInput.value = "";
      subtasks = [];
      prioritySelect.value = '1';
      categorySelect.value = 'development';
      dueDateInput.value = null;
      saveTodos();
    //   closeModel();
      renderSubtask();
      displayTodos(todos);
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
      subtasks = todos[id].subtasks;
      renderSubtask();
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
      activityLog.push(`${todos[id].title} mark completed at ${todos[id].completed_at}`);
      saveActivityLog();
      saveTodos();
      displayTodos(todos);
   }
   function toggleSubTaskCompleted(id, index) {
      console.log(id, index);
      todos[id].subtasks[index].completed = !todos[id].subtasks[index].completed;
      todos[id].subtasks[index].completed_at = new Date().toISOString().split('T')[0];
      activityLog.push(`${todos[id].subtasks[index].subtask} of ${todos[id].title} mark completed at ${todos[id].subtasks[index].completed_at}`);
      saveActivityLog();
      saveTodos();
      displayTodos(todos);
   }
   function deleteTodo(id) {
      activityLog.push(`${todos[id].title} deleted at ${new Date().toISOString().split('T')[0]}`);
      saveActivityLog();
      todos.splice(id, 1);
      saveTodos();
      displayTodos(todos);
   }
   function deleteSubTask(id, index) {
      activityLog.push(`Subtask: ${todos[id].subtasks[index].subtask} of task ${todos[id].title} deleted at ${new Date().toISOString().split('T')[0]}`);
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
            const searchSubTaskResults =
               todos.map((todo) => {
                  return { ...todo, subtasks: todo.subtasks.filter((subtask) => subtask.toLowerCase().includes(searchQuery.toLowerCase())) }
               })
            //     todos.forEach((todo) => {
            //    todo.subtasks.filter((subtask) => {
            //       subtask.toLowerCase().includes(searchQuery.toLowerCase())
            //    });
            // });
            console.log(searchSubTaskResults);
            displayTodos(searchSubTaskResults);
         }

      } else {
         displayTodos(todos);
      }
   }
   addButton.addEventListener("click", addTodo);
   searchButton.addEventListener("click", searchTodo);

