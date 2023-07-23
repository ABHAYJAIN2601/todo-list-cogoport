function displayTodos(todoArray) {
    todoList.innerHTML = "";
    // Display the filtered todos in the todo list
    if (todoArray.length > 0) {
       todoArray.forEach((todo, index) => {
          const id = index;
          const li = document.createElement("li");
          li.className = "li draggable";
          li.setAttribute('id', index);
          const checkbox = document.createElement("input");
          checkbox.className = "form-check-input";
          checkbox.type = "checkbox";
          checkbox.checked = todo.completed;
          checkbox.addEventListener("change", () => toggleTodoCompleted(index));

          const label = document.createElement("label");
          label.className = "form-check-label";

          const spanText = document.createElement("span");
          spanText.className = "todo-text";
          spanText.id = 'todoText';
          todoText = `${todo.title}`;
          if (todo.due_date != undefined)
             todoText += `( Due: ${todo.due_date}) `;
          if (todo.reminder_date != "")
             todoText += ` (Reminder: ${todo.reminder_date})`;

          spanText.innerHTML = todoText;


          const subtaskUl = document.createElement('ul');
          
          if (todo.subtasks.length > 0) {
             todo.subtasks.forEach((subtask, index) => {
                const checkbox = document.createElement("input");
                checkbox.className = "form-check-input";
                checkbox.type = "checkbox";
                checkbox.checked = subtask.completed;
                checkbox.addEventListener("change", () => toggleSubTaskCompleted(id, index));
                const subTaskLi = document.createElement('li');
                const span = document.createElement('span');
                span.setAttribute('id', `subText`);
                span.setAttribute('class', `todo-text`);
                subTaskLi.setAttribute('id', `${id}-${index}`);
                subTaskLi.classList = 'draggable-subtask';
                
                span.innerHTML = subtask.subtask;

                const editInput = document.createElement("input");
                editInput.type = 'text';
                editInput.id = 'subEditInput';
                editInput.className = "edit-input";
                editInput.style.display = "none";
                editInput.value = subtask.subtask;

                const deleteButton = document.createElement("span");
                deleteButton.className = "span-button";
                deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                deleteButton.id = 'subDeleteButton';
                deleteButton.addEventListener("click", () => deleteSubTask(id, index));

                const editButton = document.createElement("span");
                editButton.className = "span-button";
                editButton.id = 'subEditButton'
                editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
                editButton.addEventListener("click", () => editSubTask(id, index));
                const updateButton = document.createElement("button");
                updateButton.className = "span-button";
                updateButton.innerHTML = 'Save';
                updateButton.id = "subUpdateButton";
                updateButton.style.display = 'none';
                updateButton.addEventListener("click", () => updateSubTask(id, index));
                subTaskLi.appendChild(checkbox);
                subTaskLi.appendChild(span);
                subTaskLi.appendChild(editInput);
                subTaskLi.appendChild(editButton);
                subTaskLi.appendChild(updateButton);
                subTaskLi.appendChild(deleteButton);

                subtaskUl.appendChild(subTaskLi);
             });
          }
          const tagSpan = document.createElement('span');
          if (todo.tags.length > 0) {
            todo.tags.forEach((tag) => {
               const span = document.createElement('span');
               span.setAttribute('class', `tag-container tag`);
               span.innerHTML = tag;
               tagSpan.appendChild(span);
            });
         }
          const priority = document.createElement("span");
          priority.className = "tag-container " + priorityMapping[todo.priority];
          priority.id = 'todoText';
          priority.textContent = priorityMapping[todo.priority];

          const category = document.createElement("span");
          category.className = "tag-container";
          category.id = 'todoText';
          category.textContent = todo.category;

          const deleteButton = document.createElement("span");
          deleteButton.className = "span-button";
          deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
          deleteButton.id = 'delete-button';
          deleteButton.addEventListener("click", () => deleteTodo(index));

          const editButton = document.createElement("span");
          editButton.className = "span-button";
          editButton.id = 'editButton'
          editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
          editButton.addEventListener("click", () => editTodo(index));

          const updateButton = document.createElement("button");
          updateButton.className = "span-button";
          updateButton.innerHTML = 'Save';
          updateButton.id = "update-button";
          updateButton.style.display = 'none';
          updateButton.addEventListener("click", () => addTodo());

          li.appendChild(checkbox);
          li.appendChild(label);
          li.appendChild(spanText);
          li.appendChild(tagSpan);
          li.appendChild(priority);
          li.appendChild(category);
          li.appendChild(editButton);
          li.appendChild(updateButton);
          li.appendChild(deleteButton);
        //   li.appendChild(addSubtaskButton);

          todoList.appendChild(li);
          todoList.appendChild(subtaskUl);
       });
    } else {
       todoList.innerHTML = `<img class="face" src="asetes/thinking.png" alt="">
                          <h1 class="not-found"> NOT FOUND</h1>`;
    }
    makeItemsDraggable();
 }

 displayTodos(todos);