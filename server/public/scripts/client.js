console.log('js loaded')

$(document).ready(onReady);

function onReady(){
    console.log('jq loaded');
    $('#toDoBtn').on('click', saveTaskList);
};


// function submitInput(){
//     let inputTextToAppend = {
//         textInput: $('#toDoText').val()
//         };
//         console.log('inside submitInput');
//         $('#toDoText').val('');
//         console.log('this is the text input', inputTextToAppend);
    
//     // inputTextToAppend.push(textInput);
//     saveTaskList(inputTextToAppend);
//     // appendToDom();
// };

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
    console.log('in appendToDom,', array);
    $('#toDoList').empty();

    for (let i=0; i<array.length; i++){
    $('#toDoList').append(`
        <li><h3>${array[i]} <button id="complete_task">Completed</button> <button id="delete">Delete</button</h3></li>
    `)
    }
};