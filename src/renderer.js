import './index.css';

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

const handleAddTask = async () => {
    const title = taskInput.value.trim();
    console.log(title);
    await window.api.addTask(title);
}

addTaskBtn.addEventListener('click', handleAddTask);

const renderTasks = async (params) => {
    const tasks = await window.api.getAllTasks();

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        taskList.appendChild(li);
    })
};

renderTasks();