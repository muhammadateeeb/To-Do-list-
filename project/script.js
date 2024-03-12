document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const newTaskInput = document.getElementById('new-task');
    const tasksList = document.getElementById('tasks-list');

    let tasks = [];

    // Load tasks from local storage
    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        renderTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render tasks on the page
    function renderTasks() {
        tasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = createTaskElement(task, index);
            tasksList.appendChild(li);
        });
    }

    // Create task element
    function createTaskElement(task, index) {
        const li = document.createElement('li');
        li.style.border = '1px solid #ccc'; // Lighter border color
        li.style.marginBottom = '1rem'; // Margin of 1rem
        li.style.padding = '0.5rem'; // Added padding for better spacing
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between'; // Adjusted to space between elements

        const span = document.createElement('span');
        span.textContent = task;
        li.appendChild(span);

        const buttonsDiv = document.createElement('div'); // Container for buttons
        buttonsDiv.style.display = 'flex';
        buttonsDiv.style.alignItems = 'center';

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.style.backgroundColor = 'black'; // Set the background color to black
        editBtn.style.color = 'white'; // Set text color to white
        editBtn.style.borderRadius = '10px'; // Set border radius to 10px
        editBtn.style.borderWidth = '5px'; // Set border width to 5px
        editBtn.style.fontSize = '15px'; // Set font size to 15px
        editBtn.style.width = '60px'; // Set width for consistency
        editBtn.addEventListener('click', () => editTask(index));
        buttonsDiv.appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.style.backgroundColor = 'grey'; // Set the background color to grey
        removeBtn.style.borderRadius = '10px'; // Set border radius to 10px
        removeBtn.style.borderWidth = '5px'; // Set border width to 5px
        removeBtn.style.fontSize = '15px'; // Set font size to 15px
        removeBtn.style.width = '100px'; // Set width for consistency
        removeBtn.addEventListener('click', () => removeTask(index));
        buttonsDiv.appendChild(removeBtn);

        li.appendChild(buttonsDiv); // Append the container instead of buttons directly

        return li;
    }

    // Add event listener for adding a new task
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = newTaskInput.value.trim();
        const isValid = /^[a-zA-Z\s]+$/.test(newTask); // Regular expression to allow only alphabets and spaces

        if (isValid && newTask.length > 0) {
            addTask(newTask);
            newTaskInput.value = '';
        } else {
            alert('Task should only contain letters and spaces.');
        }
    });

    // Add a new task
    function addTask(task) {
        const newTask = task.toLowerCase(); // Convert task to lowercase
        if (!tasks.includes(newTask)) { // Check if the task already exists
            tasks.push(newTask); // Add the task to the tasks array
            saveTasks();
            renderTasks();
        } else {
            alert('Task already exists.'); // Alert if task already exists
        }
    }

    // Remove a task
    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Edit a task
    function editTask(index) {
        const updatedTask = prompt('Enter the updated task:');
        if (updatedTask && /^[a-zA-Z\s]+$/.test(updatedTask.trim())) {
            tasks[index] = updatedTask.trim().toLowerCase(); // Convert updated task to lowercase
            saveTasks();
            renderTasks();
        } else if (updatedTask) {
            alert('Task should only contain letters and spaces.');
        }
    }

    loadTasks();

    // Add event listener for the "Calculate Bill" button
    document.getElementById('calculate-bill').addEventListener('click', () => {
        let total = 0;
        tasks.forEach(task => {
            total += 2500; // Add 2500 rupees for each task
        });
        document.getElementById('total-bill').textContent = `TOTAL: ${total} rupees`;
    });

    // Add event listener for the reset button
    document.getElementById('reset').addEventListener('click', () => {
        tasks = [];
        saveTasks();
        renderTasks();
        document.getElementById('total-bill').textContent = '';
    });
});
