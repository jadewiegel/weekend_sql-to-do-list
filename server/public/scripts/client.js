console.log('js loaded')

$(document).ready(onReady);

function onReady(){
    console.log('jq loaded');
    $('#toDoBtn').on('click', submitInput);
}

function submitInput(){
    console.log('inside submitInput');
    let textInput = $('#toDoText').val();
    $('#toDoText').val('');
    console.log('this is the text input', textInput);

}