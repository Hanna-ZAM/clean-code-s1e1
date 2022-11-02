//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".section-add__input");//Add a new task.
var addButton=document.querySelectorAll(".button")[0];//first button
var incompleteTaskHolder=document.querySelectorAll(".doing-list")[0];//ul of #incompleteTasks
var completedTasksHolder=document.querySelectorAll(".doing-list")[1];//completed-tasks

//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add('item');
    listItem.classList.add('doing-list__item');

    //input (checkbox)
    var checkBox=document.createElement("input");
    checkBox.classList.add('item__checkbox');//checkbx
    //label
    var label=document.createElement("label");
    label.classList.add('item__label_edit'); 
    label.classList.add('item__label'); //label
    //input (text)
    var editInput=document.createElement("input");
    editInput.classList.add('input');
    editInput.classList.add('item__input');
    editInput.classList.add('input_edit'); //text
    //button.edit
    var editButton=document.createElement("button");
    //edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image
    
    deleteButtonImg.classList.add('button-delete__img');

    label.innerText=taskString;
    

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.classList.add('button');
    editButton.classList.add('item__button');
    deleteButton.classList.add('button-delete');
    deleteButton.classList.add('item__button-delete');
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    console.log('добавили')
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;  console.log(listItem);

    var editInput=listItem.querySelector('.input');
    var label=listItem.querySelector(".item__label");
    var editBtn=listItem.querySelector(".button");
    var containsClass=label.classList.contains("item__label_save");

    console.log(editInput);
    console.log(label);
    console.log(editBtn);
    console.log(containsClass);


    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.

    label.classList.toggle('item__label_edit');
    label.classList.toggle('item__label_save');
    editInput.classList.toggle('input_edit');
    editInput.classList.toggle('input_save');
    
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
//addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".item__checkbox");
    var editButton=taskListItem.querySelector(".button");
    var deleteButton=taskListItem.querySelector(".button-delete");
    console.log('deleteButton');
    console.log(deleteButton);


    //Bind editTask to edit button.
    editButton.addEventListener("click", editTask);
    //Bind deleteTask to delete button.
    deleteButton.addEventListener("click", deleteTask);
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){
   
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length; i++){
    console.log(completedTasksHolder);
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode