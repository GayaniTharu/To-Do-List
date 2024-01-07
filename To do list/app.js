$(document).ready(function () {
    // Check if tasks are stored in local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks on page load
    renderTasks();
  
    // Add task button click event
    $('#addTaskBtn').on('click', function () {
      addTask();
    });
  
    // Filter options change event
    $('#filterOptions').on('change', function () {
      renderTasks();
    });
  
    function addTask() {
      const taskInput = $('#taskInput');
      const taskList = $('#taskList');
  
      if (taskInput.val().trim() !== '') {
        // Add task to the array
        tasks.push({ text: taskInput.val(), completed: false });
  
        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
  
        // Render tasks
        renderTasks();
  
        // Clear input field
        taskInput.val('');
      }
    }
  
    function deleteTask(index) {
      // Remove task from the array
      tasks.splice(index, 1);
  
      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      // Render tasks
      renderTasks();
    }
  
    function toggleCompleted(index) {
      // Toggle the completed status of the task
      tasks[index].completed = !tasks[index].completed;
  
      // Save tasks to local storage
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      // Render tasks
      renderTasks();
    }
  
    function renderTasks() {
      const taskList = $('#taskList');
      const filterOption = $('#filterOptions').val();
  
      taskList.empty();
  
      tasks.forEach((task, index) => {
        if (
          (filterOption === 'all') ||
          (filterOption === 'active' && !task.completed) ||
          (filterOption === 'completed' && task.completed)
        ) {
          const listItem = $('<li>').append(`
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="task-actions">
              <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle" data-index="${index}">
              <button class="delete" data-index="${index}">Delete</button>
            </div>
          `);
  
          // Toggle completed status on checkbox change
          listItem.find('.toggle').on('change', function () {
            toggleCompleted($(this).data('index'));
          });
  
          // Delete task on button click
          listItem.find('.delete').on('click', function () {
            deleteTask($(this).data('index'));
          });
  
          // Append list item to the task list
          taskList.append(listItem);
        }
      });
    }
  });
  