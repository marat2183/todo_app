
import {moveFromCompletedtoHold, moveFromHoldtoCompleted} from '../services/taskTransmissionsService.js';


function deleteByTaskId(taskId){
    let TaskDataBlock = document.querySelector('.task[data-id=\"' + taskId + '\"]');
    TaskDataBlock.remove();
}

function getActiveTaskDate(task){
    const taskObj = {}
    taskObj.name = task.querySelector('.active__task-name').textContent;
    taskObj.status = task.querySelector('.active__task-status').textContent;
    taskObj.priority = task.querySelector('.active__task-priority').textContent;
    taskObj.id = task.dataset.id
    return taskObj
}


function getInactiveTaskDate(task){
    const taskObj = {}
    taskObj.name = task.querySelector('.inactive__task-name').textContent;
    taskObj.status = task.querySelector('.inactive__task-status').textContent;
    taskObj.priority = task.querySelector('.inactive__task-priority').textContent;
    taskObj.id = task.dataset.id
    return taskObj
}

function editTask(taskId, newTaskData){
    let oldTaskDataBlock = document.querySelector('.task[data-id=\"' + taskId + '\"]');
    if (oldTaskDataBlock.classList[1] === "active__task-list-item"){
        oldTaskDataBlock.querySelector('.active__task-name').textContent = newTaskData.name;
        oldTaskDataBlock.querySelector('.active__task-status').textContent = newTaskData.status;
        oldTaskDataBlock.querySelector('.active__task-priority').textContent = newTaskData.priority;
        if (newTaskData.status === "Завершена"){
            moveFromHoldtoCompleted(taskId, newTaskData);
        }
    }
    else{
        oldTaskDataBlock.querySelector('.inactive__task-name').textContent = newTaskData.name;
        oldTaskDataBlock.querySelector('.inactive__task-status').textContent = newTaskData.status;
        oldTaskDataBlock.querySelector('.inactive__task-priority').textContent = newTaskData.priority;
        if (newTaskData.status === "В работе"){
            moveFromCompletedtoHold(taskId, newTaskData);
        }
    }
}


function needToEdit(taskId, newTaskData){
    let oldTaskDataBlock = document.querySelector('.task[data-id=\"' + taskId + '\"]');
    let oldTaskData;
    if (oldTaskDataBlock.classList[1] === "active__task-list-item"){
        oldTaskData = getActiveTaskDate(oldTaskDataBlock)
    }
    else{
        oldTaskData = getInactiveTaskDate(oldTaskDataBlock)
    }
    if (oldTaskData.name !== newTaskData.name){
        return true
    }
    else if (oldTaskData.status !== newTaskData.status){
        return true
    }
    else if (oldTaskData.priority !== newTaskData.priority){
        return true
    }
    else {
        return false
    }
}

export {getActiveTaskDate, getInactiveTaskDate, editTask, needToEdit, deleteByTaskId};