console.log('js loaded')

$(document).ready(onReady);

function onReady(){
    console.log('jq loaded');
    $('#toDoBtn').on('click', saveTaskList);
    $('#toDoList').on('click', '.delete', deleteTask);
    $('#toDoList').on('click', '.task_complete', taskCompleted)
};


function saveTaskList(){
    let newTask = $('#toDoText').val();
    $('#toDoText').val('');
    console.log('inside saveTaskList', newTask);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask,
            status: 'Not Completed'
        }
    }).then(function(){
        console.log('req for newTasks in POST,', newTask);
        getTasks();
    });
};

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response){
        console.log('in client /GET', response);
        appendToDom(response);
    });
}

function appendToDom(array){
    $('#toDoList').empty();
    for (let i=0; i<array.length; i++){
        // console.log('in appendToDom,', array[i].id);
        if (array[i].status == 'Completed'){
            $('#toDoList').append(`
            <div class="green">
            <li>
            <h3 id="taskLine">${array[i].tasks} -- ${array[i].status} 

            <button data-id="${array[i].id}" class="delete">Delete</button
            </h3>
            </li>
            </div>
        `)
        } else
            $('#toDoList').append(`
            <div>
            <li>
            <h3 id="taskLine">${array[i].tasks} -- ${array[i].status} 
            <button data-id="${array[i].id}" class="task_complete">Completed</button> 
            <button data-id="${array[i].id}" class="delete">Delete</button
            </h3>
            </li>
            </div>
            `)
        
    }
};

function deleteTask(){
    const id = $(this).data('id');
    console.log('inside deleteTask', id);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`
    }).then(function(response){
        console.log('in delete request, ', response);
        getTasks();
    }).catch(function(error){
        console.log('error with deleting, ', error);
    })
};

function taskCompleted(){
    const id = $(this).data('id');
    console.log('inside taskCompleted, ', id);
    $.ajax({
        type: 'PUT',
        url: `/tasks/status/${id}`,
        data: {completed: 'Not Completed'},
    }).then(function(){
        getTasks();
    }).catch(function(error){
        console.log('error with putting', error);
    })
}