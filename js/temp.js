import {openPopup, closePopup, addDataToPopup, getPopupData, confirmationPopup, createPopup, editPopup}  from './services/popupServices.js';
import {getActiveTaskDate, getInactiveTaskDate, editTask, needToEdit, deleteByTaskId} from './services/taskServices.js';
import {addToHoldList, addToCompletedList} from './services/taskTransmissionsService.js'
import {showTaskListInput} from './services/taskListTransmissions.js'


const popup = document.querySelector('.popup__inner');
const closePopupBtn = document.querySelector('.popup__close');
const createTask = document.querySelector('.top__link');
const cancelBtn = document.querySelector('.cancel-btn');
const editActiveTasks = document.querySelectorAll('.active__task-edit-icon');
const confirmPopupBtn = document.querySelector('.success-btn');
const editInactiveTasks = document.querySelectorAll('.inactive__task-edit-icon');
const deleteActiveTasks = document.querySelectorAll('.active__task-delete-icon');
const deleteInactiveTasks = document.querySelectorAll('.inactive__task-delete-icon');
const addTaskListBtn = document.querySelector('.title-task-list__add-btn');
// const taskListMenu = document.querySelector('.menu');

createTask.addEventListener('click', function(event) {
    event.preventDefault();
    createPopup();
    let taskName = popup.querySelector('.popup__taks-name');
    let taskId = popup.querySelector('.popup__task-id');
    taskName.value = "";
    // taskId.textContent = ""
    openPopup();
});


closePopupBtn.addEventListener('click', function(event) {
    event.preventDefault();
    closePopup();
});


cancelBtn.addEventListener('click', function(event) {
    event.preventDefault();
    closePopup();
});


editActiveTasks.forEach(function(button){
    button.addEventListener('click', function(event) {
        console.log('click')
        event.preventDefault();
        // editPopup();
        let task = this.closest('.active__task-list-item');
        const taskObj = getActiveTaskDate(task)
        editPopup(taskObj);
        // addDataToPopup(popup, taskObj)
        openPopup();
    });
})


editInactiveTasks.forEach(function(button){
    button.addEventListener('click', function(event) {
        event.preventDefault();
        // editPopup();
        let task = this.closest('.inactive__task-list-item');
        const taskObj = getInactiveTaskDate(task)
        editPopup(taskObj);
        // addDataToPopup(popup, taskObj)
        openPopup();
    });
})

deleteActiveTasks.forEach(function(button){
    button.addEventListener('click', function(event) {
        event.preventDefault();
        let taskBlock = this.closest('.task');
        let taskId = taskBlock.dataset.id;
        console.log("delete")
        confirmationPopup(taskId);
        
        // deleteByTaskId(taskId)
        openPopup();
    });
});

deleteInactiveTasks.forEach(function(button){
    button.addEventListener('click', function(event) {
        event.preventDefault();
        let taskBlock = this.closest('.task');
        let taskId = taskBlock.dataset.id;
        console.log("delete")
        confirmationPopup(taskId);
        // deleteByTaskId(taskId)
        openPopup();
    });
});


confirmPopupBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let newTaskDataBlock = this.closest('.popup__inner');
    let taskId = newTaskDataBlock.querySelector('.popup__task-id').textContent;
    let action = newTaskDataBlock.querySelector('.success-btn').textContent;
    if (action === 'Изменить'){
        const newTaskData = getPopupData(newTaskDataBlock)
        // request to server
        if (needToEdit(taskId, newTaskData)){
            editTask(taskId, newTaskData);
        }
        closePopup();
        return
    }
    else if (action === 'Добавить'){
        const newTaskData = getPopupData(newTaskDataBlock);
        // console.log(newTaskDataBlock);
        let taskStatus = newTaskDataBlock.querySelector('#task-importance').value;
        console.log(taskStatus)
        if (taskStatus === 'В работе'){
            addToHoldList(taskId, newTaskData);
            closePopup();
            return;
        }
        else if (taskStatus === "Завершена"){
            addToCompletedList(taskId, newTaskData);
            closePopup();
            return;
        }
        else{
            closePopup();
            return;
        }
    }
    else if (action === 'Удалить'){
        deleteByTaskId(taskId);
        closePopup();
        return;
    
    }
    else {
        console.log('Error');
        closePopup();
        return;
    }
    
});

addTaskListBtn.addEventListener('click', function(event){
    event.preventDefault();
    if (document.querySelector('.tasks-list-section').childElementCount === 2){
        showTaskListInput();
    }
    

    console.log("add task click");
});