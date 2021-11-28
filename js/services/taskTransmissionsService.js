import {getInactiveTaskDate, getActiveTaskDate} from './taskServices.js';
import {openPopup, addDataToPopup, confirmationPopup, editPopup} from './popupServices.js';

const popup = document.querySelector('.popup__inner');
const CompletedTasksBlock =  document.querySelector(".inactive__task-list");
const HoldTasksBlock =  document.querySelector(".active__task-list");


function addToHoldList(taskId, newTaskData){
    let newTaskBlock = `
    <div class="task active__task-list-item" data-id=\"${taskId}\">
        <p class="active__task-name">${newTaskData.name}</p>
        <a class="active__task-status">${newTaskData.status}</a>
        <span class="active__task-priority">${newTaskData.priority}</span>
        <span class="active__task-creator">Ivan Ivanov</span>
        <div class="active__task-btns">
            <a href="" class="active__task-edit">
                <img src="./img/edit.svg" alt="" class="active__task-edit-icon">
            </a>
            <a href="" class="active__task-delete">
                <img src="./img/delete.svg" alt="" class="active__task-delete-icon">
            </a>
        </div>
    </div>`
    HoldTasksBlock.insertAdjacentHTML('beforeend', newTaskBlock);
    let editIcon = document.querySelector('.task[data-id=\"' + taskId + '\"] .active__task-edit-icon');
    let deleteIcon = document.querySelector('.task[data-id=\"' + taskId + '\"] .active__task-delete-icon');
    editIcon.addEventListener('click', function(event) {
        event.preventDefault();
        let task = this.closest('.active__task-list-item');
        const taskObj = getActiveTaskDate(task)
        editPopup(taskObj);
        openPopup();
    });
    deleteIcon.addEventListener('click', function(event) {
        event.preventDefault();
        let taskBlock = this.closest('.task');
        let taskId = taskBlock.dataset.id;
        console.log("delete")
        confirmationPopup(taskId);
        
        // deleteByTaskId(taskId)
        openPopup();
    });
} 


function addToCompletedList(taskId, newTaskData){
    let newTaskBlock = `
    <div class="task inactive__task-list-item" data-id=\"${taskId}\">
        <p class="inactive__task-name">${newTaskData.name}</p>
        <a class="inactive__task-status">${newTaskData.status}</a>
        <span class="inactive__task-priority">${newTaskData.priority}</span>
        <span class="inactive__task-creator">Ivan Ivanov</span>
        <div class="inactive__task-btns">
            <a href="" class="inactive__task-edit">
                <img src="./img/edit.svg" alt="" class="inactive__task-edit-icon">
            </a>
            <a href="" class="active__task-delete">
                <img src="./img/delete.svg" alt="" class="inactive__task-delete-icon">
            </a>
        </div>
    </div>`;
    CompletedTasksBlock.insertAdjacentHTML('beforeend', newTaskBlock);
    let editIcon = document.querySelector('.task[data-id=\"' + taskId + '\"] .inactive__task-edit-icon');
    let deleteIcon = document.querySelector('.task[data-id=\"' + taskId + '\"] .inactive__task-delete-icon');
    editIcon.addEventListener('click', function(event) {
        event.preventDefault();
        let task = this.closest('.inactive__task-list-item');
        const taskObj = getInactiveTaskDate(task);
        console.log(task, taskObj);
        addDataToPopup(taskObj);
        openPopup();
    });
    deleteIcon.addEventListener('click', function(event) {
        event.preventDefault();
        let taskBlock = this.closest('.task');
        let taskId = taskBlock.dataset.id;
        console.log("delete")
        confirmationPopup(taskId);
        // deleteByTaskId(taskId)
        openPopup();
    });
    return;
}

function moveFromHoldtoCompleted(taskId, newTaskData){
    let TaskDataBlock = document.querySelector('.task[data-id=\"' + taskId + '\"]');
    TaskDataBlock.remove();
    addToCompletedList(taskId, newTaskData);
}


function moveFromCompletedtoHold(taskId, newTaskData){
    let TaskDataBlock = document.querySelector('.task[data-id=\"' + taskId + '\"]');
    TaskDataBlock.remove();
    addToHoldList(taskId, newTaskData);
}

export {moveFromCompletedtoHold, moveFromHoldtoCompleted, addToHoldList, addToCompletedList};