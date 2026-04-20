let tasks = [];
let currentFilter = "all";
let taskInput = document.getElementById("taskInput");
let dateInput = document.getElementById("dateInput");
let addBtn = document.getElementById("addTask");
let taskList = document.getElementById("taskList");
let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let pendingTasks = document.getElementById("pendingTasks");
let filterButtons = document.querySelectorAll(".filter-btn");
addBtn.addEventListener("click", function () {
    let text = taskInput.value.trim();
    let date = dateInput.value;
    if (text === "") {
        alert("Enter a task!");
        return;
    }
    let task = {
        text: text,
        date: date,
        completed: false,
        important: false
    };
    tasks.push(task);
    taskInput.value = "";
    dateInput.value = "";
    render();
});

function render() {
    taskList.innerHTML = "";
    let filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "all") return true;
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        if (currentFilter === "important") return task.important;
        if (currentFilter === "today") {
            let today = new Date().toISOString().split("T")[0];
            return task.date === today;
        }
    });

    filteredTasks.forEach(function (task, index) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        if (task.completed) {
            taskDiv.classList.add("completed");
        }
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            task.completed = !task.completed;
            render();
        });
        let info = document.createElement("div");
        info.classList.add("task-info");
        let title = document.createElement("h4");
        title.innerText = task.text;
        let tag = document.createElement("span");
        tag.classList.add("tag");
        if (task.completed) {
            tag.innerText = "Completed";
        } else {
            tag.innerText = "Pending";
        }
        info.appendChild(title);
        info.appendChild(tag);
        let date = document.createElement("div");
        date.classList.add("task-date");
        date.innerText = task.date;
        let actions = document.createElement("div");
        actions.classList.add("task-actions");
        let starBtn = document.createElement("button");
        starBtn.innerText = "⭐";
        starBtn.addEventListener("click", function () {
            task.important = !task.important;
            render();
        });
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "🗑️";
        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            render();
        });
        actions.appendChild(starBtn);
        actions.appendChild(deleteBtn);
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(info);
        taskDiv.appendChild(date);
        taskDiv.appendChild(actions);
        taskList.appendChild(taskDiv);
    });
    updateFooter();
}
function updateFooter() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.completed).length;
    let pending = total - completed;
    totalTasks.innerText = total;
    completedTasks.innerText = completed;
    pendingTasks.innerText = pending;
}
filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        currentFilter = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        render();
    });
});
