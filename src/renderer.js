import './index.css';

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');



const renderTasks = async (params) => {
    // Clear the task list before rendering
    taskList.innerHTML = '';

    const tasks = await window.api.getAllTasks();

    tasks.forEach(task => {
        const li = document.createElement('li');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = !!task.completed;
        checkbox.addEventListener('change', async () => {
            await window.api.markCompleted({ id: task.id, completed: checkbox.checked ? 1 : 0 });
        })


        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖️';
        deleteBtn.addEventListener('click', async () => {
            await window.api.deleteTask(task.id);
            renderTasks();
        })

        li.appendChild(checkbox);
        li.appendChild(titleSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    })
};

const handleAddTask = async () => {
    const title = taskInput.value.trim();
    await window.api.addTask(title);
    taskInput.value = '';
    renderTasks();
}

addTaskBtn.addEventListener('click', handleAddTask);

renderTasks();