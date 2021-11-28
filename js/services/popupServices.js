const popup = document.querySelector('.popup__inner');
const popupBg = document.querySelector('.popup');
let tempTasksCounter = 6;

function openPopup(){
    popup.classList.add('open');
    popupBg.classList.add('open');
}

function closePopup(){
    popup.classList.remove('open');
    popupBg.classList.remove('open');
}
function addDataToPopup(taskObj){
    let taskName = popup.querySelector('.popup__taks-name');
    console.log(taskName);
    let taskStatus = popup.querySelector('select#task-importance');
    let taskPriority = popup.querySelector('select#task-priority');
    let taskId = popup.querySelector('.popup__task-id');
    taskName.value = taskObj.name;
    taskStatus.value = taskObj.status;
    taskPriority.value = taskObj.priority;
    taskId.textContent = taskObj.id;
}

function getPopupData(newTaskDataBlock){
    let newTaskData = {};
    newTaskData.name = newTaskDataBlock.querySelector('.popup__taks-name').value;
    newTaskData.status = newTaskDataBlock.querySelector('select#task-importance').value;
    newTaskData.priority = newTaskDataBlock.querySelector('select#task-priority').value;
    // let taskId = newTaskDataBlock.querySelector('.popup__task-id').textContent;
    return newTaskData;
}

function confirmationPopup(taskId){
    // let TaskDataBlock = document.querySelector('.task[data-id=\"' + taskId + '\"]');
    let popupBlock = document.querySelector('.popup');
    let popupInnerBlock = popupBlock.querySelector('.popup__inner')
    popupInnerBlock.querySelector('.popup__task-id').textContent = taskId;
    if (!(popupInnerBlock.querySelector('p'))){
        popupInnerBlock.querySelectorAll("label").forEach(labelTag => labelTag.remove());
        popupInnerBlock.querySelector('input').remove();
        popupInnerBlock.querySelectorAll("select").forEach(selectTag => selectTag.remove());
        let newPopupInner = `<p class="popup__confirmation-msg">Вы уверены?</p>`
        let successBtn = popupInnerBlock.querySelector('.success-btn');
        successBtn.textContent = "Удалить";
        popupInnerBlock.querySelector('.popup__btns').insertAdjacentHTML('beforebegin', newPopupInner);
    }
}

function editPopup(taskObj){
    let popupBlock = document.querySelector('.popup');
    let popupInnerBlock = popupBlock.querySelector('.popup__inner')
    if (popupInnerBlock.querySelector('p')){
        popupInnerBlock.querySelector('.popup__confirmation-msg').remove();
        let newPopupInner = `
        <label for="task">Название задачи</label>
            <input type="text" id="task" class="popup__taks-name">
            <label for="task-priority">Приоритет задачи</label>
            <select id="task-priority" сlass="popup__task-priority" value="Низкий">
                <option>Низкий</option>
                <option>Средний</option>
                <option>Высокий</option>
            </select>
            <label for="task-importance">Статус задачи</label>
            <select id="task-importance" сlass="popup__task-importance" value="В работе">
                <option>В работе</option>
                <option>Завершена</option>
            </select>
        `
        popupInnerBlock.querySelector('.popup__btns').insertAdjacentHTML('beforebegin', newPopupInner);
    }
    addDataToPopup(taskObj);
    let successBtn = popupInnerBlock.querySelector('.success-btn');
    successBtn.textContent = "Изменить";
}

function createPopup(){
    tempTasksCounter++;
    let popupBlock = document.querySelector('.popup');
    let popupInnerBlock = popupBlock.querySelector('.popup__inner')
    if (popupInnerBlock.querySelector('p')){
        popupInnerBlock.querySelector('.popup__confirmation-msg').remove();
        let newPopupInner = `
        <label for="task">Название задачи</label>
            <input type="text" id="task" class="popup__taks-name">
            <label for="task-priority">Приоритет задачи</label>
            <select id="task-priority" сlass="popup__task-priority" value="Низкий">
                <option>Низкий</option>
                <option>Средний</option>
                <option>Высокий</option>
            </select>
            <label for="task-importance">Статус задачи</label>
            <select id="task-importance" сlass="popup__task-importance" value="В работе">
                <option>В работе</option>
                <option>Завершена</option>
            </select>
        `
        popupInnerBlock.querySelector('.popup__btns').insertAdjacentHTML('beforebegin', newPopupInner);
    }
    console.log(tempTasksCounter);

    let successBtn = popupInnerBlock.querySelector('.success-btn');
    let taskId = popupInnerBlock.querySelector('.popup__task-id');
    successBtn.textContent = "Добавить";
    taskId.textContent = tempTasksCounter;
}






export {openPopup, closePopup, addDataToPopup, getPopupData, confirmationPopup, createPopup, editPopup};