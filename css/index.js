let currentTaskListContainer = document.querySelector('.task-container--incomplete');
let completedTaskListContainer = document.querySelector('.task-container--completed');
let currentTaskList = document.querySelector('.task__list--incomplete');
let completedTaskList = document.querySelector('.task__list--completed');
let currentTaskCount = document.querySelector('.task__count--incomplete');
let completedTaskCount = document.querySelector('.task__count--completed');
let taskMenuBtns = document.querySelectorAll('.task__menu-icon');
let taskMenuList = document.querySelectorAll('.task__menu-list');
let taskColumn = document.querySelector('.task__column');
let taskArea = document.querySelector('.task__area');
let addBtn = document.querySelector('.task__btn');
let addTaskInput = document.getElementById('task-input');
let taskList = document.querySelectorAll('.task__list');


taskArea.style.display = "none";
currentTaskList.innerHTML = "";
let numCurrent = 0;
let numCompleted = 0;

function removeCompletedIllustration() {
  let illustration = document.querySelectorAll('.illustration');
  if (illustration.length > 0) {
    let totalPendingTask = currentTaskListContainer.querySelector('.task-total');
    let [illstrate] = illustration;
    totalPendingTask.style.display = 'block';
    currentTaskListContainer.classList.add('fade-down');
    illstrate.remove();
    currentTaskListContainer.classList.remove('fade-down');
  }
}



function task_Add_Remove_Action(selectedCheckbox, action) {

  selectedCheckbox.closest('.task__item').classList.add('fade-out-right');

    selectedCheckbox.closest('.task__item').remove();
    if (action == 'completed') {
      showTotalTask('incomplete');
    } else if (action == 'incomplete') {
      showTotalTask('completed');
    }


  numCompleted++;
  let taskName = selectedCheckbox.closest('.task__item').querySelector('.task__heading').textContent;
  let addCompletedTaskItem = document.createElement('li');
  addCompletedTaskItem.classList.add('task__item', `task__item--${action}`, `task__item--${action}-${numCompleted}`);

  let checkedState;
  let taskMenu;
  let taskContent;
  let taskIcon;
  if (action == 'completed') {
    checkedState = true;
    taskIcon = `<img class="task__icon-delete task__icon-delete--${action}" src="trash-white.svg" alt="trash icon">
    `; 

    taskContent = `<p class="task__heading">${taskName}</p>`; 
    taskMenu = '';
  } else if (action == 'incomplete') {
    checkedState = false; 
    taskIcon = `<img class="task__icon-menu task__icon-menu--${action}" src="dot-menu-white.svg" alt="dot menu">`; 
    taskContent = `<textarea rows="1" class="task__heading task__textarea" maxlength="75" disabled>${taskName}</textarea>`; 
    taskMenu = `<div class="task__menu">
                      <ul class="task__menu-list">
                      <li class="task__menu-item task__menu--edit"><i class="fa-sharp fa-solid fa-pen"></i></li>
                      <li class="task__menu-item task__menu--delete"><i class="fa-solid fa-trash"></i></li>
                      </ul>
                        </div>`;

  }
  addCompletedTaskItem.innerHTML = ` <div class="task__bar">
                                                <div class="task-action">
                                                    <input type="checkbox" class="checkbox__input" id="check-${action}-${numCompleted}" checked="${checkedState}">
                                                    <label for="check-${action}-${numCompleted}" class="checkbox__label"></label>
                                                </div>
                                                <div class="task__content">
                                                    ${taskContent}
                                                </div>
                                                ${taskIcon}
                                                ${taskMenu}
                                            </div>`;
  switch (action) {
    case 'completed':
      completedTaskList.append(addCompletedTaskItem);
      break;
    case 'incomplete':
      currentTaskList.prepend(addCompletedTaskItem);
      break;
  }

  showTotalTask(action); 
}


function addTask() {
	let taskName = addTaskInput.value;
	taskArea.style.display = "block";
	removeCompletedIllustration();
	if (taskName == "") return;
	numCurrent++;
	let addTaskItem = document.createElement('li');
	addTaskItem.classList.add('task__item', 'task__item--incomplete', `task__item--incomplete-${numCurrent}`);
	addTaskItem.innerHTML = `<div class="task__bar">
									  <div class="task-action">
										  <input type="checkbox" class="checkbox__input" id="check-incomplete-${numCurrent}" >
										  <label for="check-incomplete-${numCurrent}" class="checkbox__label"></label>
									  </div>
									  <div class="task__content">
										  <textarea rows="1" class="task__heading task__textarea" maxlength="75" disabled>${taskName}</textarea>
									  </div>
                    <div class="task__icon-menu task__icon-menu--incomplete"> <i class="fa-sharp fa-solid fa-ellipsis-vertical"></i> </div>
									  <div class="task__menu">
										  <ul class="task__menu-list">
											<li class="task__menu-item task__menu--edit"><i class="fa-sharp fa-solid fa-pen"></i></li>
											<li class="task__menu-item task__menu--delete"><i class="fa-solid fa-trash"></i></li>
										  </ul>
									  </div>
								  </div>`;
	currentTaskList.prepend(addTaskItem);
  
	addTaskInput.value = "";
  
	showTotalTask('incomplete');
  }

function showTotalTask(state) {
  let taskItems = document.querySelectorAll(`.task__item--${state}`);
  switch (state) {
    case 'incomplete':
      currentTaskCount.textContent = taskItems.length;
      break;
    case 'completed':
      completedTaskCount.textContent = taskItems.length;
  }
}

function addCompletedIllustration() {
  let taskIncompleteArray = document.querySelectorAll('.task__item--incomplete');
  if (taskIncompleteArray.length === 0) {
    let taskContainer = document.querySelector('.task-container--incomplete');
  }
}

function addMainIllustration() {
  let taskIncompleteArray = document.querySelectorAll('.task__item--incomplete');
  let taskCompleteArray = document.querySelectorAll('.task__item--completed');
  if (taskIncompleteArray.length === 0 && taskCompleteArray.length === 0) {
    taskArea.style.display = "none";
  }
}

addBtn.addEventListener('click', function(e) {
  addTask();
});

addTaskInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

completedTaskList.innerHTML = "";
currentTaskList.addEventListener('click', function(e) {
	let taskBarMenuArray = document.querySelectorAll('.task__menu');
	let taskBarMenu = e.target.closest('.task__bar').querySelector('.task__menu');
	let taskEditBtn = e.target.classList.contains('task__menu--edit');
	let taskDeleteBtn = e.target.classList.contains('task__menu--delete');
	let taskTextarea = e.target.closest('.task__item').querySelector('.task__heading');
	let clicked = e.target.classList.contains('checkbox__label');
	let clickedMenuIcon = e.target.classList.contains('task__icon-menu');
	let clickedCheckbox = e.target.closest('.checkbox__label');
	let taskItem = e.target.closest('.task__item');
	let taskBar = e.target.closest('.task__bar');


  if (clicked) {
    task_Add_Remove_Action(clickedCheckbox, 'completed');
    addCompletedIllustration();

  };

  if (clickedMenuIcon) {
    taskBarMenuArray.forEach(menu => {
      menu.style.display = 'none';
      menu.classList.remove('task__menu--active');
    });
    taskBarMenu.style.display = 'block';
    taskBarMenu.classList.add('task__menu--active');
  }
  if (taskEditBtn) {
    taskTextarea.removeAttribute('disabled');
    taskTextarea.select();
  }

  // When delete btn in menu is clicked
  if (taskDeleteBtn) {
    taskItem.classList.add('fade-out-right');
    taskItem.remove();
    showTotalTask('incomplete');
    addCompletedIllustration();
  }

})
currentTaskList.addEventListener('keydown', function(e) {
  let taskTextarea = e.target.closest('.task__heading');
  if (e.key == 'Enter') {
    e.preventDefault();
    taskTextarea.setAttribute('disabled', '');
  };
})

currentTaskList.addEventListener('keyup', function(e) {
  let taskTextarea = e.target.closest('.task__heading');
  taskTextarea.textContent = taskTextarea.value;
})
completedTaskList.addEventListener('click', function(e) {
  let clicked = e.target.classList.contains('checkbox__label');
  let clickedCheckbox = e.target.closest('.checkbox__label');
  let clickedDeleteIcon = e.target.classList.contains('task__icon-delete');
  let taskItem = e.target.closest('.task__item');
  if (clicked) {
    task_Add_Remove_Action(clickedCheckbox, 'incomplete');
    removeCompletedIllustration();
  }

  if (clickedDeleteIcon) {
    taskItem.classList.add('fade-out-right');
      taskItem.remove();
      showTotalTask('completed'); 
  }

})