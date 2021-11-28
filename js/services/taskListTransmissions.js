const taskListMenu = document.querySelector('.menu');
let tempTaskListCounter = 3;


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
            setTimeout(deleteTaskListInput,500);
            document.querySelector('.title-task-list__add-btn').style.opacity = 1;
            document.querySelector('.title-task-list__add-btn').style.pointerEvents = 'all';
            return
        }
    });
}

function addTaskList(userInput){
    let taskListBlock = `
    <li class="menu__list-item">
        <a href="" class="menu__list-link" data-id=\"${tempTaskListCounter}\">${userInput}</a>
        <a href="" class="inactive__task-edit">
            <img src="./img/edit.svg" alt="" class="tasklist-edit-icon">
        </a>
        <a href="" class="active__task-delete">
            <img src="./img/delete.svg" alt="" class="tasklist-delete-icon">
        </a>
    </li>
    `
    let listOfTaskLists = document.querySelector('.menu__list');
    listOfTaskLists.insertAdjacentHTML('beforeend', taskListBlock);
    // const editIcon = document.querySelector('');
    // const deleteIcon = document.querySelector('')
}

export {showTaskListInput}