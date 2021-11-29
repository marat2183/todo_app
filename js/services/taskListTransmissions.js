const taskListMenu = document.querySelector('.menu');
let tempTaskListCounter = 3;



function hideElement(element){
    element.style.opacity = 0;
    element.style.pointerEvents = 'none';
}

function showElement(element){
    element.style.opacity = 1;
    element.style.pointerEvents = 'all';
}

function addDeleteTaksListListener(deleteIconLink){
    deleteIconLink.addEventListener('click', function(event){
        event.preventDefault();
        let taskList = this.closest('.menu__list-item');
        const taskListId = taskList.dataset.id;
        deleteTaksList(taskListId)
    })
}

function addEditTaksListListener(btn, TaskListBlock, addedInputBlock){
    let deleteTaskListIcon = TaskListBlock.querySelector('.tasklist-delete');
    let editTaskListIcon = TaskListBlock.querySelector('.tasklist-edit');
    let taskListname = TaskListBlock.querySelector('.menu__list-link');
    btn.addEventListener('click', function(event){
        event.preventDefault();
        let userInputName = TaskListBlock.querySelector('.edit-task-list-input').value;
        taskListname.textContent = userInputName;
        hideElement(addedInputBlock);
        addedInputBlock.remove();
        TaskListBlock.classList.remove("inactive-block");
        showElement(taskListname);
        showElement(editTaskListIcon);
        showElement(deleteTaskListIcon);
    });
}

function deleteTaksList(taskListId){
    const TaskListBlock = document.querySelector('.menu__list-item[data-id=\"' + taskListId + '\"]');
    TaskListBlock.style.opacity = 0;
    TaskListBlock.style.pointerEvents = 'none';
    setTimeout(() =>{
        TaskListBlock.remove()
    }, 200)
}

function editTaskList(taskListId){
    const TaskListBlock = document.querySelector('.menu__list-item[data-id=\"' + taskListId + '\"]');
    TaskListBlock.classList.add("inactive-block");
    let taskListname = TaskListBlock.querySelector('.menu__list-link');
    let deleteTaskListIcon = TaskListBlock.querySelector('.tasklist-delete');
    let editTaskListIcon = TaskListBlock.querySelector('.tasklist-edit');
    let input_block = `
    <div class="edit-tast-list-block">
        <input type="text" class="edit-task-list-input" value=\"${taskListname.textContent}\">
        <a><img class="task-list__change-btn" src="./img/mark.svg" alt=""></a>
    </div>
    `
    // let taskListname = TaskListBlock.querySelector('.menu__list-link');
    hideElement(taskListname);
    hideElement(editTaskListIcon)
    hideElement(deleteTaskListIcon)
    TaskListBlock.insertAdjacentHTML('beforeend', input_block);
    let addedInputBlock = TaskListBlock.querySelector('.edit-tast-list-block');
    const inputChangeBtn = TaskListBlock.querySelector('.task-list__change-btn');
    addEditTaksListListener(inputChangeBtn, TaskListBlock, addedInputBlock);
}


function deleteTaskListInput(){
    document.querySelector('.tasks-list-section').querySelector('.task-list-add').remove();
    return
}

function showTaskListInput(){
    tempTaskListCounter++;
    let newBlock = `
    <div class="task-list-add">
        <input type="" class="task-list-input" placeholder="Введите название списка">
        <a><img class="task-list__add-btn" src="./img/mark.svg" alt=""></a>
    </div>
    `
    taskListMenu.insertAdjacentHTML('beforebegin', newBlock);
    document.querySelector('.task-list-add').style.opacity = 1;
    document.querySelector('.task-list-add').style.pointerEvents = 'all';
    document.querySelector('.title-task-list__add-btn').style.opacity = 0;
    document.querySelector('.title-task-list__add-btn').style.pointerEvents = 'none';
    let inpuptBtn = document.querySelector('.task-list__add-btn');
    inpuptBtn.addEventListener('click', function(event){
        event.preventDefault();
        let userInput = document.querySelector('.task-list-input').value;
        if (userInput){
            addTaskList(userInput);
            document.querySelector('.task-list-add').style.opacity = 0;
            document.querySelector('.task-list-add').style.pointerEvents = 'none';
            setTimeout(deleteTaskListInput,200);
            document.querySelector('.title-task-list__add-btn').style.opacity = 1;
            document.querySelector('.title-task-list__add-btn').style.pointerEvents = 'all';
            return
        }
    });
}

function addTaskList(userInput){
    let taskListBlock = `
    <li class="menu__list-item" data-id=\"${tempTaskListCounter}\">
        <a href="" class="menu__list-link">${userInput}</a>
        <a href="" class="tasklist-edit">
            <img src="./img/edit.svg" alt="" class="tasklist-edit-icon">
        </a>
        <a href="" class="tasklist-delete">
            <img src="./img/delete.svg" alt="" class="tasklist-delete-icon">
        </a>
    </li>
    `
    let listOfTaskLists = document.querySelector('.menu__list');
    listOfTaskLists.insertAdjacentHTML('beforeend', taskListBlock);
    const newTaskListBlock = document.querySelector('.menu__list-item[data-id=\"' + tempTaskListCounter + '\"]');
    const editIcon = newTaskListBlock.querySelector('.tasklist-edit');
    const deleteIcon = newTaskListBlock.querySelector('.tasklist-delete');
    editIcon.addEventListener('click', function(event){
        event.preventDefault();
        let taskList = this.closest('.menu__list-item');
        const taskListId = taskList.dataset.id;
        editTaskList(taskListId)
    })
    addDeleteTaksListListener(deleteIcon);
    
}

export {showTaskListInput, deleteTaksList, editTaskList}