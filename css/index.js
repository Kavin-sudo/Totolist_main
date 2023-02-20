let taskInput = document.getElementById("new-task"); //new-task
let addButton = document.getElementsByTagName("button")[0]; //first button
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
let completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
let inCount = document.getElementById("incompled");
let complCount = document.getElementById("completed");

var total = document.getElementById('total')


var tasks = []
console.log(tasks)
//New Task List Item
let createNewTaskElement = function(taskString) {
	let listItem = document.createElement("li");
	let checkBox = document.createElement("input"); // checkbox
	let label = document.createElement("label");
	let editInput = document.createElement("input"); // text
	let editButton = document.createElement("button");
	let deleteButton = document.createElement("button");

	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText = "Edit";
	editButton.className = "edit";

	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//Add a new task
let addTask = function() {
	console.log("Add task...");
	 // Add one more todo in total count.
	total.textContent = +total.textContent + 1;

	let listItem = createNewTaskElement(taskInput.value);
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	// inCount.innerText= "hhhhhh"
	// var date = new Date()
	// let datee = date.getMonth()
	// tasks.push({
	//   text: document.getElementById("new-task").value,
	//   date: datee
	// });
	// console.log(tasks)
	for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
		console.log(`TASK IN COMPLED  ${incompleteTasksHolder.children.length}`)
	let result = incompleteTasksHolder.children.length
	inCount.innerText=result

	}



	taskInput.value = "";
}

//Edit an existing task
let editTask = function() {
	console.log("Edit task...");

	let listItem = this.parentNode;

	let editInput = listItem.querySelector("input[type=text");
	let label = listItem.querySelector("label");

	let containsClass = listItem.classList.contains("editMode");
	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}
	listItem.classList.toggle("editMode");

}

//Delete an existing task
let deleteTask = function() {
	console.log("Delete task...");
	let listItem = this.parentNode;
	let ul = listItem.parentNode;
    console.log(ul)
	ul.removeChild(listItem);
}

//Mark a task as complete
let taskCompleted = function() {
	console.log("Task complete...");
	let listItem = this.parentNode;
    console.log(listItem);
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
	// if (this.checked) complCount.textContent = +complCount.textContent + 1;
    // else inCount.textContent = +inCount.textContent - 1;
    for (let i = 0; i < completedTasksHolder.children.length; i++) {
        // console.log(`TASK COMPLED  ${completedTasksHolder.children.length}`)
          let result = completedTasksHolder.children.length
		  complCount.innerText=result
    }
	
	
}

//Mark a task as incomplete
let taskIncomplete = function() {
	console.log("Task incomplete...");
	let listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	// if (this.checked) inCount.textContent = +inCount.textContent + 1;
    // else inCount.textContent = +inCount.textContent - 1;
	for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
		console.log(`TASK IN COMPLED  ${incompleteTasksHolder.children.length}`)
	let result = incompleteTasksHolder.children.length
	inCount.innerText=result

	}
}

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
	console.log(checkBox)
}

addButton.addEventListener("click", function () {
    if (taskInput.value == "") {
        alert("please add Task Name");
      } else {
          addTask();
      }
    });

for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);

}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

